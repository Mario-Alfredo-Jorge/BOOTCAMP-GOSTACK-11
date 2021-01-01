import express from 'express';
import routes from './routes';

import './database';

const server = express();
server.use(express.json());

server.use(routes);

server.listen(3232, () =>
  console.log('server is running on http://localhost:3232'),
);