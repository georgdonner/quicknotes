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
    return res.status(400).send(error.message);
  }
});

// Get one note
router.get('/note/:note', async (req, res) => {
  try {
    const note = await Note.getById(req.params.note);
    return res.json(note);
  } catch (error) {
    return res.status(400).send(error.message);
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
      return res.status(400).send(error.message);
    }
  }
  return res.sendStatus(401);
});

// Update a note
router.put('/note/:note', async (req, res) => {
  const data = new Note(req.body);
  try {
    const updated = await Note.updateNote(req.params.note, data.toObject());
    Notebook.refreshUpdatedAt(updated.notebook);
    return res.json(updated);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
