const mysql = require('mysql2/promise');
const { password } = require('./config.js')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'simpleTodos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})


const dummyDb = {
  users: {},
  todos: {}
}


module.exports = {
  pool,
  dummyDb
}