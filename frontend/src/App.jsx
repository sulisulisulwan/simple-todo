import React from 'react';
import { useState } from 'react';
import SigninModal from './components/modals/SigninModal.jsx';
import SignupModal from './components/modals/SignupModal.jsx';
import LogInOut from './components/LogInOut.jsx';
import TodoList from './components/TodoList.jsx';

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
      <main>
        {currentUserData !== null ?
          <TodoList
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
          />
          : null
        }
      </main>
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