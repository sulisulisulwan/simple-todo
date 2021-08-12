const express = require('express');
const models = require('../models/todosModels.js')
const router = express.Router();


router.post('/', (req, res, next) => {
  let todo = req.body
  models.createTodo(todo)
    .then(_=> {
      res.sendStatus(201)
    })
    .catch(err => {
      console.error(new Error(err))
      res.status(500).json(err)
    })
})

router.get('/', (req, res, next) => {
  let userID = req.query.userID
  let username = req.query.username

  models.getTodos(userID, username)
    .then(todosData => {
      res.status(200).json(todosData);
    })
    .catch(err => {
      console.error(new Error(err));
      res.status(500).json(err);
    })
})

router.put('/', (req, res, next) => {
  let todo = req.body
  models.updateTodo(todo)
    .then(_=> {
      res.sendStatus(201)
    })
    .catch(err => {
      console.error(new Error(err))
      res.status(500).json(err)
    })
})

router.delete('/', (req, res, next) => {
  let todo = req.body
  models.deleteTodo(todo)
    .then(_=> {
      res.sendStatus(201)
    })
    .catch(err => {
      console.error(new Error(err))
      res.status(500).json(err)
    })
})




module.exports = router;