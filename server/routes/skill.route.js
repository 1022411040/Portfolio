import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from "../controllers/skill.controller.js";

const router = express.Router();

// Public
router.get("/", getSkills);

// Admin
router.post("/", adminAuth, createSkill);
router.put("/:id", adminAuth, updateSkill);
router.delete("/:id", adminAuth, deleteSkill);
router.put("/reorder/bulk", adminAuth, reorderSkills);

export default router;
