import React from 'react';
import { useState } from 'react';
import Todo from './Todo.jsx'
import axios from 'axios';

const TodoList = ({ currentUserData, setCurrentUserData }) => {

  let todos = [];
  const [todoInputField, setTodoInputField] = useState('')

  if (currentUserData !== null) {
    for (let todo in currentUserData.todos) {

      todos.push(currentUserData.todos[todo])
    }
  }

  const handleTodoInputChange = (e) => {
    setTodoInputField(e.target.value)
  }


  const createRandomId = () => {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let id = ''
    for (let i = 0; i < 11; i++) {
      id += Math.floor(Math.random() * 10).toString()
      id += letters[Math.floor(Math.random() * 52)]
    }
    return id;
  }

  const handleCreateTodo = (e) => {
    e.preventDefault();
    let username = currentUserData.username;
    let id = createRandomId();
    let todo = {
      id: id,
      username: username,
      text: todoInputField
    }
    axios.post('/todos', todo)
      .then(_=> {
        setTodoInputField('');
        return axios.get(`/todos?username=${username}`)
      })
      .then(result => {
        setCurrentUserData(result.data)
      })
  }

  const handleClearComplete = () => {
    //go into database and delete all completed tasks
    axios.delete(`/todos?username=${username}`)
      .then(_=> {
        return axios.get(`/todos?username=${username}`)
      })
      .then(results => {
        setCurrentUserData(results.data);
      })
      .catch(err => {
        console.error(new Error(err))
      })
  }

  return (
    <div id="todo-list">
      <form onSubmit={handleCreateTodo}>
        <label>
          Write a Todo:
          <input type="text" onChange={handleTodoInputChange}></input>
        </label>
        <input type="submit" value="Add Todo"></input>
      </form>
      <button id="clear-complete" type="button" onClick={handleClearComplete}>Clear Complete</button>
      Todo List:
      {todos.length ?
        <table>
          <tbody>
            {todos.map((todo, i) =>
              <Todo
                key={i}
                todo={todo}
                currentUserData={currentUserData}
                setCurrentUserData={setCurrentUserData}
              />)}
          </tbody>
        </table>
          : <span>You have nothing to do</span>}

    </div>
  )
}

export default TodoList;