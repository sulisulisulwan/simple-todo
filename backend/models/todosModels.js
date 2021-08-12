const mysql = require('mysql2');
const { pool } = require('../db.js');


const createTodo = (todo) => {

  return new Promise ((resolve, reject) => {

    let q = `INSERT INTO Todos (userID, todoText, isComplete, userID) VALUES (?, ?, ?, ?);`
    let v = `${todo.userID}, ${todo.todoText}, false, ${userID}`;
    pool.getConnection()
      .then(conn => {
        const resolution = conn.query(q, v)
        return resolution
      })
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
    pool.getConnection()
      .then(conn => {
        const resolution = conn.query(q);
        return resolution
      })
      .then(data => {
        let todos = {}

        data[0].forEach(todo => {
          todos[todo.todoID] = {
            todoId: todo.todoID,
            text: todo.todoText,
            isComplete: todo.isComplete
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

const updateTodo = (todo) => {
  return new Promise ((resolve, reject) => {


    pool.getConnection()
      .then(conn => {
        //todo will be an object of changed todo:
        /*
          {
            userID: INT
            todo: {
              someProperty: UPDATED VALUE
              anotherProperty: UPDATED VALUE
            }
          }
        */
      let updatedValues = '';
      for (let prop in todo) {
        let value = typeof prop === 'boolean' ? `${prop} = ${todo[prop]}, ` : `${prop} = "${todo[prop]}", `
        updatedValues += value
      }
      updatedValues.substring(0, updatedValues.length - 1);
      let userID = todo.userID
      let q = `UPDATE Todos SET ${updatedValues}WHERE userID = ${userID};`

      let resolution = conn.query(q)
      return resolution;
      })
      .then(_=> {
        resolve()
      })
      .catch(err => {
        console.log(err);
        reject(err)
      })

  })
}

const deleteTodo = (todoID) => {
  return new Promise((resolve, reject) => {

    pool.getConnection()
      .then(conn => {
        let q = `DELETE FROM Todos WHERE todoID = ${todoID};`
        let resolution = conn.query(q)
        return resolution;
      })
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