import SEO from "../models/seo.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getSEO = catchAsync(async (req, res) => {
  const seo = await SEO.findOne({ page: req.params.page }).lean();
  res.json({ success: true, data: seo });
});

export const upsertSEO = catchAsync(async (req, res) => {
  const seo = await SEO.findOneAndUpdate(
    { page: req.params.page },
    req.body,
    { upsert: true, new: true, runValidators: true }
  );
  res.json({ success: true, data: seo });
});
