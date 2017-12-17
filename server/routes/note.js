const express = require('express');

const router = express.Router();

const Note = require('../models/note');
const Notebook = require('../models/notebook');

// Get all notes
router.get('/notebook/:notebook/all', async (req, res) => {
  try {
    const notes = await Note.getAll(req.params.notebook);
    return res.json(notes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get one note
router.get('/note/:note', async (req, res) => {
  try {
    const note = await Note.getById(req.params.note);
    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Post a note
router.post('/notebook/:notebook/new', async (req, res) => {
  if (req.user) {
    try {
      const created = await Note.addNote(req.body, req.params.notebook, req.user._id);
      Notebook.refreshUpdatedAt(created.notebook);
      return res.json(created);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.sendStatus(401);
});

// Update a note
router.put('/note/:note', async (req, res) => {
  try {
    const updated = await Note.updateNote(req.params.note, req.body);
    Notebook.refreshUpdatedAt(updated.notebook);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete a note
router.delete('/note/:note', async (req, res) => {
  try {
    const removed = await Note.removeNote(req.params.note);
    Notebook.refreshUpdatedAt(removed.notebook);
    return res.json({});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
