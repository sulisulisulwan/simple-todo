import React from 'react';
import TodoList from './TodoList.jsx';

const Main = ({ currentUserData, setCurrentUserData}) => {
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