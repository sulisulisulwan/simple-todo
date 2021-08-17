import React from 'react';
import ReactDom from 'react-dom';
import { useState } from 'react';
import axios from 'axios';

const SigninModal = ( {isOpen, setSigninModalIsOpen, setSignupModalIsOpen, setCurrentUserData} ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleTextInput = (e) => {
    let text = e.target.value;
    if (e.target.id === 'username-field') {
      setUsername(text);
    } else if (e.target.id === 'password-field') {
      setPassword(text);
    }
  }

  const verifyUserHandler = (e) => {
    e.preventDefault();
    let body = {
      username: username,
      pw: password
    }
    return axios.post('/user/authorize', body)
    .then(result => {
      let userID = result.data.userID
      return axios.get(`/todos?userID=${userID}&username=${username}`)
    })
    .then(result => {
      let todos = {}
      for (let todoID in result.data.todos) {
        todos[todoID] = result.data.todos[todoID]
      }
      setSigninModalIsOpen(false);
      setCurrentUserData({
        userID: result.data.userID,
        username: username,
        todos: todos
      })
    })
    .catch(err => {
      console.error(new Error(err));
    })
  }

  return isOpen ?
      ReactDom.createPortal(
        <div id="sign-in-modal-wrapper" className="modal-wrapper">
          <div id="sign-in-modal" className="modal-overlay">
            <div id="sign-in-close-button" className="modal-close-button-line"><span className="modal-close-button" onClick={() => setSigninModalIsOpen(false)}>X</span></div>
            <div id="sign-in-form">
              <div id="new-to-simpleTodo">
                New to SimpleTodo?  <span className="sign-up-button" onClick={() => {
                  setSignupModalIsOpen(true)
                  setSigninModalIsOpen(false)
                  }}>Sign up!</span>
              </div>
              <form className="form-inputs" onSubmit={verifyUserHandler}>
                <label>
                  Username: <input id="username-field" type="text" onChange={handleTextInput}></input>
                </label>
                <label>
                  Password: <input id="password-field" type="text" onChange={handleTextInput}></input>
                </label>
                <input type="submit" id="submit-button" value="Sign In"></input>
              </form>
            </div>
          </div>
        </div>, document.getElementById('portal')
      )
    : null;
}



export default SigninModal;