import { Router } from 'express';
import AppointmentsRouter from './AppointmentsRouter';
import UsersRouter from './UsersRouter';
import SessionsRouter from './SessionsRouter';
import ensuredAuthenticate from '../middlewares/ensureAuthenticate';

const routes = Router();

routes.use('/sessions', SessionsRouter);

routes.use(ensuredAuthenticate);
routes.use('/appointment', AppointmentsRouter);
routes.use('/users', UsersRouter);

export default routes;
