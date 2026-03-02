import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const deviceSchema = new mongoose.Schema(
  {
    device: { type: String },
    os: { type: String },
    ip: { type: String },
    lastActive: { type: Date },
  },
  { _id: false }
);

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
      select: false,
    },

    avatar: {
      url: { type: String },
      publicId: { type: String },
    },

    role: {
      type: String,
      enum: ["ADMIN"],
      default: "ADMIN",
      immutable: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
      index: true,
    },

    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      passwordChangedAt: { type: Date },
      loginAttempts: { type: Number, default: 0 },
      lockUntil: { type: Date },
    },

    lastLoginAt: { type: Date },

    devices: [deviceSchema],

    audit: {
      createdBy: { type: String, default: "system" },
      notes: { type: String },
    },
    refreshTokens: [
      {
        tokenHash: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
        ip: String,
        userAgent: String,
      },
    ],
  },
  { timestamps: true }
);



// Password hashing
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.security.passwordChangedAt = new Date();
});


// Password compare
adminSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Account lock logic (basic)
adminSchema.methods.isLocked = function () {
  if (!this.security.lockUntil) return false;
  return this.security.lockUntil > Date.now();
};

export default mongoose.model("Admin", adminSchema);
