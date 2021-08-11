import React from 'react';
import ReactDom from 'react-dom';
import { useState } from 'react';
import axios from 'axios';

const SigninModal = ( {isOpen, setSigninModalIsOpen, setSignupModalIsOpen, setUserData} ) => {
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

  axios.post('/user/validate', body)
  .then(_=> {
    return axios.get(`/todos?username=${username}`)
  })
  .then(result => {
    setSigninModalIsOpen(false);
    setUserData(result.data)
  })
  .catch(err => {
    console.error(new Error(err));
  })
}

  return isOpen ?
      ReactDom.createPortal(
        <div id="sign-in-modal-wrapper" className="modal-wrapper">
          <div id="sign-in-modal" className="modal-overlay">
            <div id="sign-in-close-button"><span onClick={() => setSigninModalIsOpen(false)}>X</span></div>
            <div id="sign-in-form">
              New to SimpleTodo?  <span onClick={() => {
                setSignupModalIsOpen(true)
                setSigninModalIsOpen(false)
                }}>Sign up!</span>
              <form onSubmit={verifyUserHandler}>
                <label>
                  Username: <input id="username-field" type="text" onChange={handleTextInput}></input>
                </label>
                <label>
                  Password: <input id="password-field" type="text" onChange={handleTextInput}></input>
                </label>
                <input type="submit"></input>
              </form>
            </div>
          </div>
        </div>, document.getElementById('portal')
      )
    : null;
}



export default SigninModal;