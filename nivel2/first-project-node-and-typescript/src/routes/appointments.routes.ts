import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns'

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRepository = new AppointmentsRepository();


const AppointmentRoute = Router();

AppointmentRoute.get('/', ( req, res ) => {

  const appointments = appointmentsRepository.returnAll();
  return res.json(appointments);
})

AppointmentRoute.post('/', ( req, res ) => {

  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if(findAppointmentInSameDate){
    return res.status(400).json({ error: 'This appointment is already booked!' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});


export default AppointmentRoute;
