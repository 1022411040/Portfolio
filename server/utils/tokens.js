import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (admin) => {
  return jwt.sign(
    { id: admin._id.toString(), role: admin.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (admin) => {
  return jwt.sign(
    { id: admin._id.toString(), tokenType: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
