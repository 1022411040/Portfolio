import express from "express";
import {
  adminRegister,
  adminLogin,
  refreshAccessToken,
  adminLogout,
  adminMe
} from "../controllers/admin.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/register", adminRegister);     // disable after bootstrap
router.post("/login", adminLogin);
router.post("/refresh", refreshAccessToken);
router.post("/logout", adminAuth, adminLogout);
router.get("/me", adminAuth, adminMe);

export default router;
