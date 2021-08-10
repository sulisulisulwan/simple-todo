const mysql = require('mysql2');
const { dummyDb } = require('../db.js');


//DUMMY MODELS

/* expect todo object to be
 {
   id: NUMBER
   text: STRING (the actual todo)
 }
*/

const insertTodo = (todo) => {
  return new Promise((res, rej) => {
    let err;
    db.todos[todo.id] = todo.text
    err ? rej(err) : res()
  })
}

const getTodos = (db) => {
  return new Promise((res, rej) => {
    let err;
    let todosData = []
    for (let todo in db.todos) {
      todosData.push({
        id: todo,
        text: db.todos[todo]
      });
    }
    err ? rej(err) : res(todosData)
  });
}

const updateTodo = (db, todo) => {
  return new Promise((res, rej) => {
    let err;
    db.todos[todo.id] = todo.text;
    err ? rej() : res()
  })
}

const deleteTodo = () => {
  return new Promise ((res, rej) => {
    let err;
    delete db.todos[todo.id];
    err ? rej() : res();
  })
}

//REAL MODELS


module.exports = {
  insertTodo,
  getTodos,
  updateTodo,
  deleteTodo
}