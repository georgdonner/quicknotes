const express = require('express');
const router = express.Router();

module.exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}