const mysql = require('mysql2');
const { pool } = require('../db.js');

const createTodo = (todo) => {

  return new Promise ((resolve, reject) => {
    let q = `INSERT INTO Todos (userID, todoText, isComplete, username) VALUES (?, ?, ?, ?);`
    let v = [todo.userID, todo.todoText, false, todo.username]
    pool.query(q, v)
      .then(_=> {
        resolve();
      })
      .catch(err => {
        console.log(err)
        reject(err)
      });
  })
}



const getTodos = (userID, username) => {
  return new Promise ((resolve, reject) => {
    let q = `SELECT * FROM Todos WHERE userID = ${Number(userID)};`
    return pool.query(q)
      .then(data => {
        let todos = {}

        data[0].forEach(todo => {
          todos[todo.todoID] = {
            todoID: todo.todoID,
            text: todo.todoText,
            isComplete: todo.isComplete === 1 ? true : false
          }
        })

        let todosData = {
          userID: userID,
          username: username,
          todos: todos
        }
        resolve(todosData);
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

const updateTodo = (todoID, prop) => {
  return new Promise ((resolve, reject) => {
    let updatedValue = typeof prop[1] === 'boolean' ? `${prop[0]} = ${prop[1]}` : `${prop[0]} = "${prop[1]}"`
    let q = `UPDATE Todos SET ${updatedValue} WHERE todoID = ${todoID};`
    pool.query(q)
      .then(_=> {
        resolve()
      })
      .catch(err => {
        console.log(err);
        reject(err)
      })

  })
}

const deleteTodo = (userID) => {
  return new Promise((resolve, reject) => {
    let q = `DELETE FROM Todos WHERE userID = ${userID} AND isComplete = true;`
    pool.query(q)
      .then(_=>{
        resolve();
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}


module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}