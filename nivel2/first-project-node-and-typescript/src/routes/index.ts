import { Router } from 'express';
import AppointmentsRouter from './AppointmentsRouter';

const routes = Router();

routes.use('/appointment', AppointmentsRouter);

export default routes;
