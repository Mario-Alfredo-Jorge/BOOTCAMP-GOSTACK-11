import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './Errors/AppError';
import './database';

const server = express();
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));

server.use(routes);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

server.listen(3232, () =>
  console.log('server is running on http://localhost:3232'),
);
