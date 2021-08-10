const express = require('express');
const auth = require('../models/auth.js')
const router = express.Router();

router.post('user/create', (req, res) => {
  let user = req.body;
  auth.createUser(user)
    .then(_=> {
      res.sendStatus(201);
    })
    .catch(err => {
      typeof err === string ? res.status(400).json(err) : res.sendStatus(500)
    })
})

router.post('user/validate', (req, res) => {
  let user = req.body;
  auth.validateUser(user)
    .then(_=> {
      res.sendStatus(201)
    })
    .catch(err => {
      typeof err === string ? res.status(400).json(err) : res.sendStatus(500);
    })
})

module.exports = router