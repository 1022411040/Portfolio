import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  submitContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contact.controller.js";

const router = express.Router();

// Public
router.post("/", submitContact);

// Admin
router.get("/", adminAuth, getContacts);
router.put("/:id/status", adminAuth, updateContactStatus);

export default router;
