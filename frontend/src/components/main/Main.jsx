import React from 'react';
import SignedInView from './SignedInView.jsx'
import SignedOutView from './SignedOutView.jsx'

const Main = ({ currentUserData, setCurrentUserData}) => {
  return (
    <main>
      {currentUserData !== null ?
        <SignedInView
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        : <SignedOutView />
      }
    </main>
  )
}



export default Main