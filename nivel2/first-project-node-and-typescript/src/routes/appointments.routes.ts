import { Router } from 'express';
import uniqid from 'uniqid';
import { startOfHour, parseISO, isEqual } from 'date-fns'

interface Appointment {
  id: string;
  provider: string;
  date: Date
}


const AppointmentRoute = Router();

const appointments: Appointment[] = [];
AppointmentRoute.post('/', ( req, res ) => {

  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if(findAppointmentInSameDate){
    return res.status(400).json({ error: 'This appointment is already booked!' });
  }

  const appointment = {
    id: uniqid(),
    provider,
    date: parsedDate,
  }

  appointments.push(appointment);

  return res.json(appointment);
});


export default AppointmentRoute;
