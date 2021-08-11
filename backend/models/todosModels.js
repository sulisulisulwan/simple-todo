const mysql = require('mysql2');
const { dummyDb } = require('../db.js');


//DUMMY MODELS

/* expect todo object to be
 {
   id: NUMBER
   username: STRING
   text: STRING (the actual todo)
 }
*/

const createTodo = (todo) => {
  return new Promise((res, rej) => {
    let err;
    dummyDb.users[todo.username][todo.id] = todo.text
    err ? rej(err) : res()
  })
}

const getTodos = (username) => {
  return new Promise((res, rej) => {
    let err;
    let todosData = []
    for (let todo in dummyDb.users[todo.username]) {
      todosData.push({
        id: todo,
        text: dummyDb.users[todo.username].todos[todo].text
      });
    }
    err ? rej(err) : res(todosData)
  });
}

const updateTodo = (todo) => {
  return new Promise((res, rej) => {
    let err;
    dummyDb.users[todo.username].todos[todo].text = todo.text;
    err ? rej() : res()
  })
}

const deleteTodo = () => {
  return new Promise ((res, rej) => {
    let err;
    delete dummyDb.users[todo.username].todos[todo];
    err ? rej() : res();
  })
}

//REAL MODELS


module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}