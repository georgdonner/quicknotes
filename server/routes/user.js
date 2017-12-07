const express = require('express');

const router = express.Router();

const User = require('../models/user');

// Get user from session
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    res.status(401).json(null);
  }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
  try {
    const user = await User.getByUsername(req.params.username);
    return user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
