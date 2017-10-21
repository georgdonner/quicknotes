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

// Add a user
router.post('/user', (req, res, next) => {
  //TODO add advanced user logic
  const user = new User(req.body);
  User.addUser(user, (err, user) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(user);
  });
});

module.exports = router;