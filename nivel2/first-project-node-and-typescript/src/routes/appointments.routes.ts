import { Router } from 'express';
import uniqid from 'uniqid';


const AppointmentRoute = Router();

const Appointment = [];
AppointmentRoute.post('/', ( req, res ) => {

  const { provider, date } = req.body;

  const appointment = {
    id: uniqid(),
    provider,
    date,
  }

  Appointment.push(appointment);

  return res.json(appointment);
});


export default AppointmentRoute;
