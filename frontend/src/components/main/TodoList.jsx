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
        document.getElementById('add-todo-input-text').value = '';
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
    newData.someTodosClearable = false;
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
    <div id="todo-list-wrapper">
      <form id="todo-list-actions" onSubmit={handleCreateTodo}>
        <label id="add-todo-input-text-label">
          Write a Todo:
          <input className="add-todo-input-text" type="text" placeholder="Write Todo here" onChange={handleTodoInputChange}></input>
        </label>

        <input id="add-todo-input-submit" className="add-todo-action-buttons" type="submit" value="Add Todo" disabled={todoInputField.length ? false : true}></input>
        <button id="clear-complete-button" className="add-todo-action-buttons" type="button" onClick={handleClearComplete} disabled={currentUserData.someTodosClearable ? false : true}>Clear Complete</button>
      </form>
      {todos.length ?
        <table id="todo-list">
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
          : <div id="nothing-to-do">You have nothing to do</div>}

    </div>
  )
}

export default TodoList;