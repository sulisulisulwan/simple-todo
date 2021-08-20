import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Todo = ({ todo, currentUserData, setCurrentUserData, editTodoIsActive }) => {

  let {text, isComplete} = todo;
  const [todoEditedText, setTodoEditedText] = useState(text);
  const [isEditingText, setIsEditingText] = useState(false);


  const listenForEnter = (e) => {
    if (e.charCode !== 13) {
      return
    }
    let todoID = e.target.id.split('-')[1]
    let newData = {
      userID: currentUserData.userID,
      username: currentUserData.username,
      todos: currentUserData.todos,
      someTodosClearable: currentUserData.someTodosClearable
    }
    newData.todos[todoID].text = todoEditedText;
    axios.put('/todos', {
      todoID: todoID,
      todoText: newData.todos[todoID].text
    })
      .then(_=> {
        setCurrentUserData(newData);
        editTodoIsActive.current = false;
        setIsEditingText(false);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleEditTextFieldOnChange = (e) => {
    setTodoEditedText(e.target.value)
  }
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

  const clickEditTextField = () => {
    console.log(editTodoIsActive)
    if (!editTodoIsActive.current) {
      setIsEditingText(true)
      editTodoIsActive.current = true;
    }
  }

  console.log('rerender')
  return (
    <tr className="todo">
      <td className="todo-text" onClick={clickEditTextField}>
        {isEditingText ? <input autoFocus={true} className="add-todo-input-text" id={`edit-${todo.todoID}`} type="text" value={todoEditedText} onChange={handleEditTextFieldOnChange} onKeyPress={listenForEnter}></input> : text}
      </td>
      <td id={`#-${todo.todoID}`} className="todo-is-complete" onClick={toggleComplete}>
        {isComplete ? '✓' : '-'}
      </td>
    </tr>
  )
}

export default Todo;