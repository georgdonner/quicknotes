const express = require('express');
const router = express.Router();
const auth = require('../auth/auth-middleware');

const Notebook = require('../models/notebook');

// Get one notebook
router.get('/notebook/:notebook', auth.checkAuth, (req, res, next) => {
  console.log('Test');
  Notebook.canView(req.params.notebook, req.user._id, (err, canView) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!canView) {
      res.status(401).send(`You are not permitted to see this notebook.`)
    } else {
      Notebook.getById(req.params.notebook, (err, notebook) => {
        if (err) {
          res.status(400).send(err.message);
        }
        res.json(notebook);
      });
    }
  });
});

// Get all notebooks for one user
router.get('/notebooks', auth.checkAuth, (req, res, next) => {
  Notebook.getByUser(req.user._id, (err, notebooks) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(notebooks);
  });
});

// Add a notebook
router.post('/notebook', auth.checkAuth, (req, res, next) => {
  const notebook = new Notebook(req.body);
  Notebook.addNotebook(notebook, req.user._id, (err, notebook) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(notebook);
  });
});

module.exports = router;