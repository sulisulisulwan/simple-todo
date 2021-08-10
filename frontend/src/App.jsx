import React from 'react';
import { useState } from 'react';

const App = () => {

  const [username, setUsername] = useState(null);


  const displayUsername = () => {
    if (user === null) {
      return 'Currently Signed Out';
    } else {
      return `Welcome ${username}!`
    }
  }

  return (
    <main>
      <h1>A simple Todo List!</h1>
      <p>{displayUsername}</p>
    </main>
  )
}

export default App;