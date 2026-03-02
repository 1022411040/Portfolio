import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { upload } from "../middleware/multer.js";
import { uploadImage, deleteImage } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/image", adminAuth, upload.single("image"), uploadImage);
router.delete("/image", adminAuth, deleteImage);

export default router;
