import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 60,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "DevOps", "Tools", "Other"],
      required: true,
      index: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    experienceYears: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
    icon: {
      url: { type: String, match: /^https?:\/\/.+/i },
      publicId: { type: String },
    },
    order: { type: Number, default: 0, index: true },
    isVisible: { type: Boolean, default: true, index: true },

    endorsements: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
