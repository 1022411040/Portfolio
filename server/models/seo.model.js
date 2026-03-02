import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true, index: true },
    title: { type: String, maxlength: 70 },
    description: { type: String, maxlength: 160 },
    ogImage: { type: String, match: /^https?:\/\/.+/i },
    favicon: { type: String, match: /^https?:\/\/.+/i },
    siteName: { type: String, maxlength: 80 },
    robots: {
      index: { type: Boolean, default: true },
      follow: { type: Boolean, default: true },
    },
    canonicalUrl: { type: String, match: /^https?:\/\/.+/i },
  },
  { timestamps: true }
);

export default mongoose.model("SEO", seoSchema);
