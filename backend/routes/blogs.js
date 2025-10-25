import { Router } from "express";
import multer from "multer";
import {
  createBlog,
  listBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// ✅ Multer memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.get("/", listBlogs);
router.get("/:id", getBlog);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
