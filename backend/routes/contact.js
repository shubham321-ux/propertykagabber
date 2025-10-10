import { Router } from "express";
import {
  setContact,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// 🟢 Public route - anyone can get contact info
router.get("/", getContact);

// 🟠 Admin routes (secured)
router.post("/", authMiddleware, setContact);       // create or update
router.patch("/:id", authMiddleware, updateContact);  // update by id
router.delete("/", authMiddleware, deleteContact);  // delete all contacts

export default router;
