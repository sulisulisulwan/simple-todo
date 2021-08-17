import React from 'react';

const LogInOut = ( {setSigninModalIsOpen, setSignupModalIsOpen, handleSignOut, currentUserData} ) => {
  return currentUserData === null ?
    <>
      <span className="log-in-log-out-button" onClick={() => setSigninModalIsOpen(true)}>Sign In</span> | <span className="log-in-log-out-button" onClick={() => setSignupModalIsOpen(true)}>Sign Up</span>
    </>
    : <span>Logged in as <strong>{currentUserData.username}</strong> | <span className="log-in-log-out-button" onClick={handleSignOut}>Sign Out</span></span>

}

export default LogInOut