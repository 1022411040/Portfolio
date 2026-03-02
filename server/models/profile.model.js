import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    github: { type: String, match: /^https?:\/\/.+/i },
    linkedin: { type: String, match: /^https?:\/\/.+/i },
    twitter: { type: String, match: /^https?:\/\/.+/i },
    blog: { type: String, match: /^https?:\/\/.+/i },
    portfolio: { type: String, match: /^https?:\/\/.+/i },
  },
  { _id: false }
);

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, match: /^https?:\/\/.+/i },
    publicId: { type: String },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 100 },
    headline: { type: String, trim: true, maxlength: 150 },
    bio: { type: String, maxlength: 5000 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    location: { type: String, trim: true, maxlength: 120 },

    avatar: mediaSchema,
    resume: {
      url: { type: String, match: /^https?:\/\/.+/i },
      publicId: { type: String },
      lastUpdatedAt: Date,
    },

    social: socialSchema,

    sectionsVisibility: {
      showResume: { type: Boolean, default: true },
      showSocial: { type: Boolean, default: true },
      showTestimonials: { type: Boolean, default: true },
      showSkills: { type: Boolean, default: true },
      showProjects: { type: Boolean, default: true },
    },

    hero: {
      headline: { type: String, maxlength: 120 },
      subheadline: { type: String, maxlength: 200 },
      ctaText: { type: String, maxlength: 40 },
      backgroundImage: mediaSchema,
    },

    lastUpdatedBy: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
