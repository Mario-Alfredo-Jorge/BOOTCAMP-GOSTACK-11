import { Router } from 'express';
import AppointmentsRouter from './AppointmentsRouter';
import UsersRouter from './UsersRouter';

const routes = Router();

routes.use('/appointment', AppointmentsRouter);
routes.use('/users', UsersRouter);

export default routes;
