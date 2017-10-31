const express = require('express');
const auth = require('../auth/auth-middleware');

const router = express.Router();

const Notebook = require('../models/notebook');

function canView(doc, userId) {
  if (doc.publicVisible ||
    doc.owner === userId ||
    doc.editors.indexOf(userId) !== -1 ||
    doc.viewers.indexOf(userId) !== -1) {
    return true;
  }
  return false;
}

// Get one notebook
router.get('/notebook/:notebook', (req, res) => {
  Notebook.getById(req.params.notebook, (err, notebook) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    let authorized = false;
    if (!req.user) {
      notebook.publicVisible ? authorized = true : authorized = false;
    } else {
      canView(notebook, req.user._id) ? authorized = true : authorized = false;
    }
    return authorized ? res.json(notebook) : res.status(401).send('You are not authorized to see this notebook');
  });
});

// Get all notebooks for one user
router.get('/notebooks', auth.checkAuth, (req, res) => {
  Notebook.getByUser(req.user._id, (err, notebooks) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(notebooks);
  });
});

// Add a notebook
router.post('/notebook', auth.checkAuth, (req, res) => {
  Notebook.addNotebook(req.body, req.user._id, (err, created) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(created);
  });
});

module.exports = router;
