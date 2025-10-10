// routes/properties.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  create,
  list,
  getOne,
  update,
  remove,
  deleteImage,
  deleteVideo
} from "../controllers/propertyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "images") cb(null, "uploads/images");
    else if (file.fieldname === "video") cb(null, "uploads/videos");
    else cb(null, "uploads/other");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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

router.delete("/:id/images/:index", deleteImage);
// delete single video
router.delete("/:id/video", authMiddleware, deleteVideo);


export default router;
