const express = require('express');
const port = 3000;

const app = express();

app.use(express.static('./frontend/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})