import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  submitTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  moderateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";

const router = express.Router();

// Public
router.get("/", getApprovedTestimonials);
router.post("/", submitTestimonial);

// Admin
router.get("/admin", adminAuth, getAllTestimonials);
router.put("/:id/moderate", adminAuth, moderateTestimonial);
router.delete("/:id", adminAuth, deleteTestimonial);

export default router;
