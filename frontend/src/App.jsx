import React from 'react';
import { useState } from 'react';
import SigninModal from './components/modals/SigninModal.jsx';
import SignupModal from './components/modals/SignupModal.jsx';
import Header from './components/header/Header.jsx';
import Main from './components/main/Main.jsx';
import Footer from './components/footer/Footer.jsx';

const App = () => {
  const [username, setUsername] = useState(null);
  const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);


  const handleSignOut = () => {
    setCurrentUserData(null);
  }

  return (
    <>
      <Header
        setSigninModalIsOpen={setSigninModalIsOpen}
        setSignupModalIsOpen={setSignupModalIsOpen}
        handleSignOut={handleSignOut}
        currentUserData={currentUserData}
      />
      <Main
        currentUserData={currentUserData}
        setCurrentUserData={setCurrentUserData}
      />
      <Footer/>
      <SigninModal
        isOpen={signinModalIsOpen}
        setSigninModalIsOpen={setSigninModalIsOpen}
        setSignupModalIsOpen={setSignupModalIsOpen}
        setCurrentUserData={setCurrentUserData}
      />
      <SignupModal
        isOpen={signupModalIsOpen}
        setSigninModalIsOpen={setSigninModalIsOpen}
        setSignupModalIsOpen={setSignupModalIsOpen}
        setCurrentUserData={setCurrentUserData}
      />
    </>
  )
}

export default App;