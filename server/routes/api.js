const express = require('express');
const router = express.Router();

const notes = require('../models/notes');

// Get all notes
router.get('/:notebook/notes', async (req, res, next) => {
  try {
    const docs = await notes.all(req.params.notebook);
    res.json({notes: docs});
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;