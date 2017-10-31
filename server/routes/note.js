const express = require('express');

const router = express.Router();

const Note = require('../models/note');

// Get all notes
router.get('/notebook/:notebook/all', (req, res) => {
  Note.getAll(req.params.notebook, (err, notes) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(notes);
  });
});

// Get one note
router.get('/note/:note', (req, res) => {
  Note.getById(req.params.note, (err, note) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(note);
  });
});

// Post a note
router.post('/notebook/:notebook/new', (req, res) => {
  // TODO add user logic
  Note.addNote(req.body, req.params.notebook, '59eb26b2d9a25241b4b5234e', (err, created) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(created);
  });
});

// Update a note
router.put('/note/:note', async (req, res) => {
  const data = new Note(req.body);
  Note.updateNote(req.params.note, data.toObject(), (err, note) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(note);
  });
});

module.exports = router;
