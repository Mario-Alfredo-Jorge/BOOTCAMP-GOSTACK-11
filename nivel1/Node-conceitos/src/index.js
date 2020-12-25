const express = require('express');
const uniqid = require('uniqid');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());


const Projects = [];


app.get('/projects', (req, res) => {

  return res.json(Projects)
})

app.post('/projects', ( req, res ) => {
  const { title, owner } = req.body;

  const project = { title, owner, id: uniqid() };

  Projects.push(project);

  return res.status(200).json(project)

});

app.put('/projects/:id', ( req, res ) => {
  const { id } = req.params;
  const { title, owner } = req.body;


  const projectIndex = Projects.findIndex(project => project.id === id);

  if(projectIndex < 0)
    return res.status(400).json({ error: 'project not found!' })

  const project = { title, owner, id };

  Projects[projectIndex] = project;

  return res.status(200).json(project);
});

app.delete('/projects/:id', ( req, res ) => {
  const { id } = req.params;

  const projectIndex = Projects.findIndex(project => project.id === id);

  if(projectIndex < 0)
    return res.status(400).json({ error: 'Project not found!' });

  Projects.splice(projectIndex, 1);

  return res.status(204).send();
})

app.listen(3232, () => console.log('Server is running on port 3232'))