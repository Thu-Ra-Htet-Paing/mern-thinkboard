import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, showNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", showNote)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router;