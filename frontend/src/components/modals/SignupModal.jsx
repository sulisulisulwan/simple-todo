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
        setSignupModalIsOpen(false);
        setCurrentUserData({
          username: chosenUsername,
          todos: {}
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
            <div id="sign-up-close-button"><span onClick={() => setSignupModalIsOpen(false)}>X</span></div>
            <div id="sign-up-form">
              Choose your username and password below.
              <form onSubmit={createUserHandler}>
                <label>
                  Username: <input id="username-field" type="text" onChange={handleTextInput}></input>
                </label>
                <label>
                  Password: <input id="password-field" type="text" onChange={handleTextInput}></input>
                </label>
                <input type="submit"></input>
              </form>
            Already a user?  <span onClick={() => {
              setSigninModalIsOpen(true);
              setSignupModalIsOpen(false);
              }}>Sign In!</span>
            </div>
          </div>
        </div>, document.getElementById('portal')
      )
    : null;
}

export default SignupModal;