import { Router } from "express";
import { setContact, getContact } from "../controllers/contactController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public route → anyone can view
router.get("/", getContact);

// Admin routes → secured
router.post("/", authMiddleware, setContact);   // create (or upsert)
router.put("/", authMiddleware, setContact);    // full replace
router.patch("/", authMiddleware, setContact);  // partial update

export default router;
