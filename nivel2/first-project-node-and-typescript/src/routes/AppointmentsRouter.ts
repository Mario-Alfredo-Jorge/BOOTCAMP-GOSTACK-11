import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRepository = new AppointmentsRepository();

const AppointmentsRouter = Router();

AppointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.returnAll();
  return res.json(appointments);
});

AppointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInTheSameDate = appointmentsRepository.findByDate(
    parseDate,
  );

  if (findAppointmentInTheSameDate) {
    return res.status(400).json({
      error: 'This appointment is already booked, try in another date',
    });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parseDate,
  });

  return res.json(appointment);
});

export default AppointmentsRouter;
