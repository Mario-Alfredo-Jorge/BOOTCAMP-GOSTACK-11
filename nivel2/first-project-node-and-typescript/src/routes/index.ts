import { Router } from 'express';

import AppointmentRoutes from './appointments.routes';
const routes = Router();


routes.use('/appointment', AppointmentRoutes);

export default routes;
