// routes/properties.js
import { Router } from "express";
import multer from "multer";
import {
  create,
  list,
  getOne,
  update,
  remove,
  deleteImage,
  deleteVideo,
} from "../controllers/propertyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// ✅ Use memory storage (no file writes)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// create
router.post(
  "/",
  authMiddleware,
  upload.fields([{ name: "images" }, { name: "video", maxCount: 1 }]),
  create
);

// list/get
router.get("/", list);
router.get("/:id", getOne);

// update
router.put(
  "/:id",
  authMiddleware,
  upload.fields([{ name: "images" }, { name: "video", maxCount: 1 }]),
  update
);

// delete
router.delete("/:id", authMiddleware, remove);
router.delete("/:id/images/:index", authMiddleware, deleteImage);
router.delete("/:id/video", authMiddleware, deleteVideo);

export default router;
