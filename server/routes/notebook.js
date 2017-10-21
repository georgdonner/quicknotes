const express = require('express');
const router = express.Router();

const Notebook = require('../models/notebook');

// Get one notebook
router.get('/notebook/:notebook', (req, res, next) => {
  Notebook.getById(req.params.notebook, (err, notebook) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(notebook);
  });
});

// Add a notebook
router.post('/notebook', (req, res, next) => {
  const notebook = new Notebook(req.body);
  //TODO add user logic
  Notebook.addNotebook(notebook, '59eb26b2d9a25241b4b5234e', (err, notebook) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(notebook);
  });
});

module.exports = router;