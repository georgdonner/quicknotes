const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Get one user
router.get('/user/:user', (req, res, next) => {
  User.getById(req.params.user, (err, user) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(user);
  });
});

module.exports = router;