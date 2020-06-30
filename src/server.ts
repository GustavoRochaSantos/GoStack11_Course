import 'reflect-metadata';
import express, { Request, NextFunction, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppErrors from './errors/appErrors';

const server = express();

server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);
server.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppErrors) {
      return response.status(error.code).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',

      detail: { ...error },
    });
  },
);

server.listen(3333, () => console.log('Server on: http://localhost:3333'));
