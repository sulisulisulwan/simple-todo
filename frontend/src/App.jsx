import React from 'react';
import ReactDom from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState(null);
  const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  return (
    <>
      <header>
        <span onClick={() => setSigninModalIsOpen(true)}>Sign In / Sign Up</span>
      </header>
      <main>
        <h1>A simple Todo List!</h1>
        {username === null ? <p>Currently Signed Out</p> : <p>Welcome {username}!</p>}
      </main>
      <SigninModal isOpen={signinModalIsOpen} setSigninModalIsOpen={setSigninModalIsOpen} setSignupModalIsOpen={setSignupModalIsOpen}/>
      <SignupModal isOpen={signupModalIsOpen}  setSigninModalIsOpen={setSigninModalIsOpen} setSignupModalIsOpen={setSignupModalIsOpen}/>
    </>
  )
}


const SigninModal = ( {isOpen, setSigninModalIsOpen, setSignupModalIsOpen} ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
                  Username: <input type="text" onChange={setUsername}></input>
                </label>
                <label>
                  Password: <input type="text" onChange={setPassword}></input>
                </label>
                <input type="submit"></input>
              </form>
            </div>
          </div>
        </div>, document.getElementById('portal')
      )
    : null;
}

const verifyUserHandler = () => {
  alert('Verify User clicked')
}

const SignupModal = ( {isOpen, setSigninModalIsOpen, setSignupModalIsOpen} ) => {
  const [chosenUsername, setChosenUsername] = useState('')
  const [chosenPassword, setChosenPassword] = useState('')

  return isOpen ?
      ReactDom.createPortal(
        <div id="sign-up-modal-wrapper" className="modal-wrapper">
          <div id="sign-up-modal" className="modal-overlay">
            <div id="sign-up-close-button"><span onClick={() => setSignupModalIsOpen(false)}>X</span></div>
            <div id="sign-up-form">
              Choose your username and password below.
              <form onSubmit={createUserHandler}>
                <label>
                  Username: <input type="text" onChange={setChosenUsername}></input>
                </label>
                <label>
                  Password: <input type="text" onChange={setChosenPassword}></input>
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
const createUserHandler = () => {
  alert('Creates User')
}

export default App;