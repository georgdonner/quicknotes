const express = require('express');
const router = express.Router();

const db = require('./db');

// Get all notes
router.get('/:notebook/notes', (req, res, next) => {
  db.get().collection(req.params.notebook, {strict: true}, (err, collection) => {
    if (err) {
      res.status(404).send('Error: Notebook not found');
    } else {
      collection.find().toArray((err, docs) => {
        res.json({notes: docs});
      });
    }
  });
});

module.exports = router;