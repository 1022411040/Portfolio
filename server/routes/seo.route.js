import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getSEO, upsertSEO } from "../controllers/seo.controller.js";

const router = express.Router();

// Public
router.get("/:page", getSEO);

// Admin
router.put("/:page", adminAuth, upsertSEO);

export default router;
