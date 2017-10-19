const express = require('express');
const router = express.Router();

const notes = require('../models/notes');

// Get all notes
router.get('/:notebook/notes', async (req, res, next) => {
  try {
    const docs = await notes.all(req.params.notebook);
    res.json(docs);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Get one note
router.get('/:notebook/note/:id', async (req, res, next) => {
  try {
    const note = await notes.get(req.params.notebook, req.params.id);
    res.json(note);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Post a note
router.post('/:notebook/notes', async (req, res, next) => {
  const note = req.body;
  try {
    const result = await notes.add(req.params.notebook, note);
    res.json(result);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

// Update a note
router.put('/:notebook/note/:id', async (req, res, next) => {
  const data = req.body;
  try {
    const result = await notes.update(req.params.notebook, req.params.id, data);
    res.json(result);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
});

module.exports = router;