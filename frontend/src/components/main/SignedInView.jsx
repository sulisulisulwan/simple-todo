import React from 'react';
import TodoList from './TodoList.jsx';

const SignedInView = ({ currentUserData, setCurrentUserData }) => {
  return (
    <div id="signed-in-view">
      <TodoList
        currentUserData={currentUserData}
        setCurrentUserData={setCurrentUserData}
      />
    </div>
  )
}

export default SignedInView;