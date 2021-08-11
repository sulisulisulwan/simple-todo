import React from 'react';

const Todo = ({ todo, currentUserData, setCurrentUserData }) => {
  let {text, isComplete} = todo;
  console.log('isComplete is', isComplete)

  const toggleComplete = (e) => {
    e.preventDefault()
    let id = e.target.id.split('-')[1]
    let newData = {
      username: currentUserData.username,
      todos: currentUserData.todos
    }
    newData.todos[id].isComplete = !newData.todos[id].isComplete
    setCurrentUserData(newData)
  }

  return (
    <tr>
      <td>
        {text}
      </td>
      <td id={`#-${todo.id}`} onClick={toggleComplete}>
        {isComplete ? '[X]' : '[ ]'}
      </td>
    </tr>
  )
}

export default Todo;