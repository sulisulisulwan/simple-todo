import React from 'react';
import axios from 'axios';

const Todo = ({ todo, currentUserData, setCurrentUserData }) => {

  let {text, isComplete} = todo;

  const toggleComplete = (e) => {
    e.preventDefault()
    let todoID = e.target.id.split('-')[1]
    let newData = {
      userID: currentUserData.userID,
      username: currentUserData.username,
      todos: currentUserData.todos
    }
    newData.todos[todoID].isComplete = !newData.todos[todoID].isComplete
    setCurrentUserData(newData)

    axios.put('/todos', {
      todoID: todoID,
      isComplete: newData.todos[todoID].isComplete
    })
      .then(_=> {
      })
      .catch(err => {
        console.error(new Error(err));
      })
  }

  return (
    <tr>
      <td>
        {text}
      </td>
      <td id={`#-${todo.todoID}`} onClick={toggleComplete}>
        {isComplete ? '[X]' : '[ ]'}
      </td>
    </tr>
  )
}

export default Todo;