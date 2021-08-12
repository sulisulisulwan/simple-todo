const mysql = require('mysql2');
const { pool } = require('../db.js');


const createUser = (user) => {
  return new Promise ((resolve, reject) => {

    let userID;
    pool.getConnection()
      .then(conn => {
        let q = `SELECT * FROM Users WHERE username = "${user.username}";`
        let resolution = conn.query(q)
        return resolution
      })
      .then(result => {
        if (result[0].length !== 0) {
          throw new Error('username already exists')
        }
        return pool.getConnection()
      })
      .then(conn => {

        let q = `INSERT INTO Users (username, pw) VALUES ("${user.username}", "${user.pw}");`
        let resolution = conn.query(q)
        resolve(resolution);
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })

  })
}


const validateUser = (user) => {

  return new Promise ((resolve, reject) => {

    pool.getConnection()
      .then(conn => {
        let q = `SELECT * FROM Users WHERE username = "${user.username}";`
        return conn.query(q)
      })
      .then(result => {
        if (result[0].length) {
          if (result[0][0].pw !== user.pw) {
            throw new Error('password is incorrect')
          } else {
            resolve(result[0][0])
          }
        } else {
          throw new Error('username doesn\'t exist')
        }
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })

  })
}


module.exports = {
  createUser,
  validateUser
}