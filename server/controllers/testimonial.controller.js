import Testimonial from "../models/testimonial.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

export const submitTestimonial = catchAsync(async (req, res) => {
  const t = await Testimonial.create(req.body);
  res.status(201).json({ success: true, message: "Submitted for review" });
});

export const getApprovedTestimonials = catchAsync(async (req, res) => {
  const list = await Testimonial.find({ isApproved: true, isVisible: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  res.json({ success: true, data: list });
});

export const getAllTestimonials = catchAsync(async (req, res) => {
  const list = await Testimonial.find().sort({ createdAt: -1 });
  res.json({ success: true, data: list });
});

export const moderateTestimonial = catchAsync(async (req, res) => {
  const { isApproved, isVisible, order } = req.body;
  const t = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { isApproved, isVisible, order },
    { new: true }
  );
  if (!t) throw new ApiError(404, "Testimonial not found");
  res.json({ success: true, data: t });
});

export const deleteTestimonial = catchAsync(async (req, res) => {
  const t = await Testimonial.findByIdAndDelete(req.params.id);
  if (!t) throw new ApiError(404, "Testimonial not found");
  res.json({ success: true, message: "Deleted" });
});
