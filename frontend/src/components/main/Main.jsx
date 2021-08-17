import React from 'react';
import TodoList from './TodoList.jsx';
import SignedOutView from './SignedOutView.jsx'

const Main = ({ currentUserData, setCurrentUserData}) => {
  return (
    <main>
      {currentUserData !== null ?
        <TodoList
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        : <SignedOutView />
      }
    </main>
  )
}



export default Main