const express = require('express');
const auth = require('../auth/auth-middleware');

const router = express.Router();

const Notebook = require('../models/notebook');

function canView(doc, userId) {
  if (doc.publicVisible ||
    doc.owner.toString() === userId ||
    doc.editors.indexOf(userId) !== -1 ||
    doc.viewers.indexOf(userId) !== -1) {
    return true;
  }
  return false;
}

// Get one notebook
router.get('/notebook/:notebook', async (req, res) => {
  try {
    const notebook = await Notebook.getById(req.params.notebook);
    const authorized = req.user ? canView(notebook, req.user._id) : notebook.publicVisible;
    return authorized ? res.json(notebook) : res.status(401).json({
      error: 'You are not authorized to see this notebook',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get all notebooks for one user
router.get('/notebooks', auth.checkAuth, async (req, res) => {
  try {
    const notebooks = await Notebook.getByUser(req.user._id);
    return res.json(notebooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Add a notebook
router.post('/notebook', auth.checkAuth, async (req, res) => {
  try {
    const created = await Notebook.addNotebook(req.body, req.user._id);
    return res.json(created);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update a notebook
router.put('/notebook/:notebook', auth.checkAuth, async (req, res) => {
  if (!req.body.owner) return res.status(400).json({ error: 'Notebook owner not in body.' });
  const owner = req.body.owner._id || req.body.owner;
  if (owner !== req.user._id) {
    return res.status(401).json({
      error: 'You must be the owner of the notebook to update it.',
    });
  }
  try {
    const updated = await Notebook.updateNotebook(req.params.notebook, req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
