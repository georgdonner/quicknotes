const express = require('express');

const router = express.Router();

// const User = require('../models/user');

// Get user from session
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    res.json(null);
  }
});

module.exports = router;
