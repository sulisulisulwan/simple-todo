const express = require('express');
const models = require('../models/todosModels.js')
const router = express.Router();


router.post('/', (req, res, next) => {
  let todo = req.body
  models.insertTodo(todo)
    .then(_=> {
      res.sendStatus(201)
    })
    .catch(err => {
      console.error(new Error(err))
      res.status(500).json(err)
    })
})

router.get('/', (req, res, next) => {
  let username = req.query.username

  models.getTodos(username)
    .then(todos => {
      res.status(200).json(todos);
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