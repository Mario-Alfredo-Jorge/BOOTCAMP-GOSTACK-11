import React, { useState, useEffect } from 'react';

import api from './services/api';
import Header from './components/Header';
import './App.css'

const App = () => {

  const [propjects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    }).catch(e => console.log('Something went wrong, try again', e));
  },[])

  const handleNewPropject = () => {
    setProjects([...propjects, `New propject ${new Date()}`]);
  }
  return (
    <>
      <Header title="Project" />
      <ul>
        {
          propjects.map(propject => (
            <li key={propject.id}>
              {propject.title}
            </li>
          ))
        }
      </ul>

      <button type="button" onClick={handleNewPropject}>Add new Project</button>
    </>
  );
};

export default App;