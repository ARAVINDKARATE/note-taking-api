const express = require("express");
const router = express.Router();
const {
  createNote,
  getNoteById,
  queryNotesByTitle,
  updateNote,
} = require("../controllers/noteController");

// Create a new note
router.post("/notes", createNote);

// Fetch a note by its primary key
router.get("/notes/:id", getNoteById);

// Query notes by title substring
router.get("/notes", queryNotesByTitle);

// Update an existing note
router.put("/notes/:id", updateNote);

module.exports = router;
