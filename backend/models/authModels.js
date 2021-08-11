const mysql = require('mysql2');
const { dummyDb } = require('../db.js');



//DUMMY MODELS
/*
  expect user to be:
  {
    username: STRING,
    pw: STRING
  }

*/

const createUser = (user) => {
  return new Promise ((res, rej) => {
    let err;
    if (dummyDb.users[user.username]) {
      err = 'username already exists'
    } else {
      dummyDb.users[user.username] = user
      dummyDb.todos[user.username] = {}
    }
    err !== undefined ? rej(err) : res()
  })
}

const validateUser = (user) => {
  return new Promise((res, rej) => {
    let err;
    if (dummyDb.users[user.username]) {
      if (dummyDb.users[user.username].pw !== user.pw) {
        err = 'password is incorrect'
      }
    } else {
      err = 'username doesn\'t exist'
    }
    console.log(dummyDb.users[user.username])
    err ? rej(err) : res();
  })
}


//REAL MODELS

module.exports = {
  createUser,
  validateUser
}