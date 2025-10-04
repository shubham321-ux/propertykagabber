import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  createBlog,
  listBlogs,
  getBlog,   //  import single blog controller
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/images"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Routes
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.get("/", listBlogs);
router.get("/:id", getBlog); // single blog route
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
