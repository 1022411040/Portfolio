import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/slug/:slug", getProjectBySlug);

// Admin
router.post("/", adminAuth, createProject);
router.put("/:id", adminAuth, updateProject);
router.delete("/:id", adminAuth, deleteProject);

export default router;
