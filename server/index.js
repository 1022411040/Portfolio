import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

import connectDB from "./config/connectDB.js";
import adminAuthRoutes from "./routes/adminAuth.route.js";
import projectRoutes from "./routes/project.route.js";
import skillRoutes from "./routes/skill.route.js";
import profileRoutes from "./routes/profile.route.js";
import contactRoutes from "./routes/contact.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import seoRoutes from "./routes/seo.route.js";
import uploadRoutes from "./routes/upload.route.js";

const app = express();

app.use(helmet());
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL, // ❌ typo + single origin only
}));
app.use(express.json());
app.use(morgan("common"));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/uploads", uploadRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running: http://localhost:${PORT}`);
  });
});

export default app;
