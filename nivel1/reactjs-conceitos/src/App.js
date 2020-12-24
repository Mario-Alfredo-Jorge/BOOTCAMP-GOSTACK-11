import React from 'react';

import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header  title="Homepage">
        <ul>
          <li>Homepage</li>
          <li>Project</li>
          <li>Login</li>
        </ul>
      </Header>
      <Header title="Project">
        <ul>
          <li>Homepage</li>
          <li>Project</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  );
};

export default App;