import { Router } from 'express';
import AppointmentsRouter from './AppointmentsRouter';
import UsersRouter from './UsersRouter';
import SessionsRouter from './SessionsRouter';

const routes = Router();

routes.use('/appointment', AppointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
