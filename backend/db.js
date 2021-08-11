const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'simpleTodos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



const dummyDb = {
  users: {},
}


module.exports = {
  pool,
  dummyDb
}