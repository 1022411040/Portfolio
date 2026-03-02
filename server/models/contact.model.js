import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 120 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      index: true,
    },
    subject: { type: String, trim: true, maxlength: 150 },
    message: { type: String, trim: true, maxlength: 5000 },

    status: {
      type: String,
      enum: ["new", "read", "responded", "archived"],
      default: "new",
      index: true,
    },

    adminNote: { type: String, maxlength: 1000 },

    meta: {
      ip: String,
      userAgent: String,
      referrer: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
