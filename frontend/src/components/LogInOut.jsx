import React from 'react';

const LogInOut = ( {setSigninModalIsOpen, setSignupModalIsOpen, handleSignOut, currentUserData} ) => {
  return currentUserData === null ?
    <>
      <span onClick={() => setSigninModalIsOpen(true)}>Sign In</span> | <span onClick={() => setSignupModalIsOpen(true)}>Sign Up</span>
    </>
    : <span>Logged in as <strong>{currentUserData.username}</strong> | <span onClick={handleSignOut}>Sign Out</span></span>

}

export default LogInOut