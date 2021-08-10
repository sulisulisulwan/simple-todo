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

})
router.put('/', (req, res, next) => {

})
router.delete('/', (req, res, next) => {

})




module.exports = router;