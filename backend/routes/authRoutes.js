const express = require('express');
const models = require('../models/authModels.js')
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendStatus(200)
})

router.post('/create', (req, res, next) => {
  let user = req.body;
  models.createUser(user)
    .then(_=> {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err)
      typeof err === 'string' ? res.status(400).json(err) : res.sendStatus(500)
    })
})

router.post('/validate', (req, res, next) => {
  let user = req.body;
  models.validateUser(user)
    .then(_=> {
      res.sendStatus(201)
    })
    .catch(err => {
      console.log(err)
      typeof err === 'string' ? res.status(400).json(err) : res.sendStatus(500);
    })
})

module.exports = router