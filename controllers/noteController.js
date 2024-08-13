const Note = require("../models/noteModel");

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = new Note({
      title,
      body,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch a note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Query notes by title substring
exports.queryNotesByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const notes = await Note.find({ title: { $regex: title, $options: "i" } });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    note.title = req.body.title || note.title;
    note.body = req.body.body || note.body;
    note.updated_at = Date.now();
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
