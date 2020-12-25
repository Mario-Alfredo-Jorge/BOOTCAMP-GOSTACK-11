import express from 'express';
import { HelloWorld } from './routes'

const app = express();

app.get('/', HelloWorld);

app.listen(3232, () => console.log('run: http://localhost:3232'));