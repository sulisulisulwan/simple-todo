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
    dummyDb.todos[todo.username][todo.id] = {
      id: todo.id,
      text: todo.text,
      isComplete: false
    }
    console.log('here')
    err ? rej(err) : res()
  })
}

const getTodos = (username) => {
  return new Promise((res, rej) => {
    let err;
    let todosData = {
      username: username,
      todos: dummyDb.todos[username]
    }
    err ? rej(err) : res(todosData)
  });
}

const updateTodo = (todo) => {
  return new Promise((res, rej) => {
    let err;
    dummyDb.todos[todo.username].todos[todo].text = todo.text;
    err ? rej() : res()
  })
}

const deleteTodo = () => {
  return new Promise ((res, rej) => {
    let err;
    delete dummyDb.todos[todo.username].todos[todo];
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