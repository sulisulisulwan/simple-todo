import React from 'react';
import TodoList from './TodoList.jsx';

const Main = ({ currentUserData }) => {
  return (
    <main>
      {currentUserData !== null ?
        <TodoList
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        : null
      }
    </main>
  )
}



export default Main