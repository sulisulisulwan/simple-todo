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
      todos: currentUserData.todos,
      someTodosClearable: false
    }
    newData.todos[todoID].isComplete = !newData.todos[todoID].isComplete
    for (let todo in newData.todos) {
      if (newData.todos[todo].isComplete) {
        newData.someTodosClearable = true;
        break;
      }
    }
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
    <tr className="todo">
      <td className="todo-text">
        {text}
      </td>
      <td id={`#-${todo.todoID}`} className="todo-is-complete" onClick={toggleComplete}>
        {isComplete ? '✓' : '-'}
      </td>
    </tr>
  )
}

export default Todo;