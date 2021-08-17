import React from 'react';
import LogInOut from './LogInOut.jsx';

const Header = ({ setSigninModalIsOpen, setSignupModalIsOpen, handleSignOut, currentUserData}) => {
  return (
    <header>
      <div id="free-space"></div>
      <div id="simple-todo-title">
        <h1>SimpleTodo!</h1>
      </div>
      <div id="signin-signup-login-logout">
        <LogInOut
          setSigninModalIsOpen={setSigninModalIsOpen}
          setSignupModalIsOpen={setSignupModalIsOpen}
          handleSignOut={handleSignOut}
          currentUserData={currentUserData}
        />
      </div>
    </header>
  )
}

export default Header;