import React, { useState} from 'react';

import Header from './components/Header';

const App = () => {

  const [propjects, setProjects] = useState(['Development of App', 'front-end mobile']);

  const handleNewPropject = () => {
    setProjects([...propjects, `New propject ${new Date()}`]);
  }
  return (
    <>
      <Header title="Project" />
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