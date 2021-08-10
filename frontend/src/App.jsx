import React from 'react';
import { useState } from 'react';

const App = () => {

  const [username, setUsername] = useState(null);


  const displayUsername = () => {

  }

  return (
    <main>
      <h1>A simple Todo List!</h1>
      {username === null ? <p>Currently Signed Out</p> : <p>Welcome {username}!</p>}
    </main>
  )
}

export default App;