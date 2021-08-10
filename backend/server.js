const express = require('express');
const todosRoutes = require('./routes/todosRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const port = 3000;
const { dummyDb } = require('./db.js')

const app = express();

app.use(express.static('./frontend/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/db', (req, res, next) => {
  console.log(dummyDb)
  res.sendStatus(200)
})

app.use('/todos', todosRoutes)
app.use('/user', authRoutes)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})