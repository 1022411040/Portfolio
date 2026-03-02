import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getProfile, upsertProfile } from "../controllers/profile.controller.js";

const router = express.Router();

// Public
router.get("/", getProfile);

// Admin
router.put("/", adminAuth, upsertProfile);

export default router;
