const express = require('express');
const models = require('../models/models.js')
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello!')
})

router.post('/todos', (req, res) => {
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

router.get('/todos', (req, res) => {

})
router.put('/todos', (req, res) => {

})
router.delete('/todos', (req, res) => {

})




module.exports = router;