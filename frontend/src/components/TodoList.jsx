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

  const handleCreateTodo = (e) => {
    e.preventDefault();
    let { userID, username } = currentUserData;
    let todo = {
      userID: userID,
      username: username,
      todoText: todoInputField,
      isComplete: false
    }
    axios.post('/todos', todo)
      .then(_=> {
        setTodoInputField('');
        return axios.get(`/todos?username=${username}&userID=${userID}`)
      })
      .then(result => {
        setCurrentUserData(result.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleClearComplete = () => {
    let newData = {}
    newData.userID = currentUserData.userID
    newData.username = currentUserData.username
    newData.todos = currentUserData.todos
    for (let todo in newData.todos) {
      if (newData.todos[todo].isComplete) {
        delete newData.todos[todo]
      }
    }
    setCurrentUserData(newData);
    axios.delete('/todos', { data: { userID: currentUserData.userID} })
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