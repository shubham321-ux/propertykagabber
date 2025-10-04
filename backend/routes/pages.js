import express from "express";
import {
  listPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/pageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// public (frontend)
router.get("/:name", getPage);

// admin
router.get("/",  listPages);
router.post("/", authMiddleware, createPage);
router.put("/:name", authMiddleware, updatePage);
router.delete("/:name", authMiddleware, deletePage);

export default router;
