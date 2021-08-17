import React from 'react';
import ReactDom from 'react-dom';
import { useState } from 'react';
import axios from 'axios';


const SignupModal = ( {isOpen, setSigninModalIsOpen, setSignupModalIsOpen, setCurrentUserData} ) => {
  const [chosenUsername, setChosenUsername] = useState('')
  const [chosenPassword, setChosenPassword] = useState('')

  const createUserHandler = (e) => {
    e.preventDefault()
    let body = {
      username: chosenUsername,
      pw: chosenPassword
    }
    axios.post('/user/create', body)
      .then(_=> {
        return axios.post('/user/authorize', body)
      })
      .then(result => {
        let userID = result.data.userID
        return axios.get(`/todos?userID=${userID}&username=${chosenUsername}`)
      })
      .then(result => {
        let todos = {}
        let someTodosClearable = false
        for (let todoID in result.data.todos) {
          todos[todoID] = result.data.todos[todoID]
          if (result.data.todos[todoID].isComplete) {
            someTodosClearable = true
          }
        }
        setSignupModalIsOpen(false);
        setCurrentUserData({
          userID: result.data.userID,
          username: chosenUsername,
          todos: todos,
          someTodosClearable: someTodosClearable
        })
      })
      .catch(err => {
        console.error(new Error(err));
      })
  }

  const handleTextInput = (e) => {
    let text = e.target.value;
    if (e.target.id === 'username-field') {
      setChosenUsername(text);
    } else if (e.target.id === 'password-field') {
      setChosenPassword(text);
    }
  }

  return isOpen ?
      ReactDom.createPortal(
        <div id="sign-up-modal-wrapper" className="modal-wrapper">
          <div id="sign-up-modal" className="modal-overlay">
            <div id="sign-up-close-button" className="modal-close-button-line"><span className="modal-close-button" onClick={() => setSignupModalIsOpen(false)}>X</span></div>
            <div id="sign-up-form">
              Choose your username and password below.
              <form className="form-inputs" onSubmit={createUserHandler}>
                <label>
                  Username: <input id="username-field" type="text" onChange={handleTextInput}></input>
                </label>
                <label>
                  Password: <input id="password-field" type="text" onChange={handleTextInput}></input>
                </label>
                <input id="submit-button" type="submit"  value="Sign Up"></input>
              </form>
            </div>
            <div id="already-a-user">
              Already a user?  <span className="log-in-log-out-button" onClick={() => {
                setSigninModalIsOpen(true);
                setSignupModalIsOpen(false);
                }}>&nbsp;&nbsp;Sign In!</span>
            </div>
          </div>
        </div>, document.getElementById('portal')
      )
    : null;
}

export default SignupModal;