import React, { useState} from 'react';

import Header from './components/Header';
import './App.css'
import BackImage from './assets/background.jpeg';

const App = () => {

  const [propjects, setProjects] = useState(['Development of App', 'front-end mobile']);

  const handleNewPropject = () => {
    setProjects([...propjects, `New propject ${new Date()}`]);
  }
  return (
    <>
      <Header title="Project" />
      <img width={300} src={BackImage} />
      <ul>
        {
          propjects.map(propject => (
            <li key={propject}>
              {propject}
            </li>
          ))
        }
      </ul>

      <button type="button" onClick={handleNewPropject}>Add new Project</button>
    </>
  );
};

export default App;