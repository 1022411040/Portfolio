import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, hashToken } from "../utils/tokens.js";

export const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(409).json({ success: false, message: "Admin already exists" });
  }

  const admin = await Admin.create({ name, email, password });

  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  admin.refreshTokens.push({
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  await admin.save();

  res.status(201).json({
    success: true,
    data: {
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      accessToken,
      refreshToken,
    },
  });
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password +refreshTokens");
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  if (admin.status !== "Active") {
    return res.status(403).json({ success: false, message: "Account inactive" });
  }

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  admin.refreshTokens.push({
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  admin.lastLoginAt = new Date();
  await admin.save();

  res.json({
    success: true,
    data: {
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      accessToken,
      refreshToken,
    },
  });
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "Refresh token required" });
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }

  const admin = await Admin.findById(payload.id).select("+refreshTokens");
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }

  const tokenHash = hashToken(refreshToken);
  const stored = admin.refreshTokens.find(
    (t) => t.tokenHash === tokenHash && t.expiresAt > new Date()
  );

  if (!stored) {
    return res.status(401).json({ success: false, message: "Refresh token revoked" });
  }

  // Rotate refresh token
  admin.refreshTokens = admin.refreshTokens.filter((t) => t.tokenHash !== tokenHash);

  const newAccessToken = generateAccessToken(admin);
  const newRefreshToken = generateRefreshToken(admin);

  admin.refreshTokens.push({
    tokenHash: hashToken(newRefreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  await admin.save();

  res.json({
    success: true,
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
};

export const adminLogout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.json({ success: true });

  const payload = jwt.decode(refreshToken);
  if (!payload?.id) return res.json({ success: true });

  const admin = await Admin.findById(payload.id).select("+refreshTokens");
  if (!admin) return res.json({ success: true });

  const tokenHash = hashToken(refreshToken);
  admin.refreshTokens = admin.refreshTokens.filter((t) => t.tokenHash !== tokenHash);

  await admin.save();

  res.json({ success: true, message: "Logged out" });
};

export const adminMe = async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
      status: req.admin.status,
    },
  });
};
