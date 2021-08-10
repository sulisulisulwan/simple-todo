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
    if (db.users[user.username]) {
      err = 'username already exists'
    } else {
      db.users[user.username] = user
    }
    err ? rej(err) : res()
  })
}

const validateUser = (user) => {
  return new Promise((res, rej) => {
    let err;
    if (db.users[user.username]) {
      if (db.users[username].pw !== user.pw) {
        err = 'password is incorrect'
      }
    } else {
      err = 'username doesn\'t exist'
    }
    err ? rej(err) : res();
  })
}


//REAL MODELS

module.exports = {
  createUser,
  validateUser
}