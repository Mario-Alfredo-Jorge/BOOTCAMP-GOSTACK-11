import express from 'express';

const app = express();

app.get('/', ( req, res ) => {
  return res.json({ msg: 'Hello world!' });
})

app.listen(3232, () => console.log('run: http://localhost:3232'));