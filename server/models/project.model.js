import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      match: /^https?:\/\/.+/i,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    width: Number,
    height: Number,
    format: String,
    bytes: Number,
  },
  { _id: false }
);

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true },
    url: { type: String, trim: true, match: /^https?:\/\/.+/i },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    techStack: [
      {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
      },
    ],
    features: [{ type: String, trim: true, maxlength: 300 }],
    category: {
      type: String,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "archived"],
      default: "completed",
      index: true,
    },
    images: {
      type: [imageSchema],
      validate: {
        validator: (v) => v.length <= 10,
        message: "Maximum 10 images allowed per project",
      },
      default: [],
    },
    links: [linkSchema], // future-proof: demo, docs, figma, etc.
    liveUrl: {
      type: String,
      trim: true,
      match: /^https?:\/\/.+/i,
    },
    githubUrl: {
      type: String,
      trim: true,
      match: /^https?:\/\/.+/i,
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isVisible: { type: Boolean, default: true, index: true },

    metrics: {
      views: { type: Number, default: 0, min: 0 },
      clicks: { type: Number, default: 0, min: 0 },
      lastViewedAt: { type: Date },
    },

    seo: {
      title: { type: String, maxlength: 70 },
      description: { type: String, maxlength: 160 },
      ogImage: { type: String, match: /^https?:\/\/.+/i },
    },

    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Full-text search index
projectSchema.index({
  title: "text",
  shortDescription: "text",
  description: "text",
  techStack: "text",
  category: "text",
});

export default mongoose.model("Project", projectSchema);
