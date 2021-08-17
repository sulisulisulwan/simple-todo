import React from 'react';
import LogInOut from './LogInOut.jsx';

const Header = ({ setSigninModalIsOpen, setSignupModalIsOpen, handleSignOut, currentUserData}) => {
  return (
    <header>
      <div id="free-space"></div>
      <h1>SimpleTodo!</h1>
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