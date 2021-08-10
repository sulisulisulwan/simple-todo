const express = require('express');
const routes = require('./routes/routes.js')
const authRoutes = require('./routes/authRoutes.js')
const port = 3000;

const app = express();

app.use(express.static('./frontend/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', routes)
app.use('/todos', routes)
app.use('/users/create', authRoutes)
app.use('/users/validate', authRoutes)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})