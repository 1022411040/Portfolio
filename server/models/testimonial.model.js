import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 120 },
    company: { type: String, trim: true, maxlength: 120 },
    role: { type: String, trim: true, maxlength: 120 },
    message: { type: String, trim: true, maxlength: 2000 },

    avatar: {
      url: { type: String, match: /^https?:\/\/.+/i },
      publicId: String,
    },

    isApproved: { type: Boolean, default: false, index: true },
    isVisible: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },

    source: {
      type: String,
      enum: ["linkedin", "email", "form", "other"],
      default: "form",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
