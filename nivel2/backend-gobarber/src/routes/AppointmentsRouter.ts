import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../services/CreateAppointmentsServices';

const appointmentsRepository = new AppointmentsRepository();

const AppointmentsRouter = Router();

AppointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.returnAll();
  return res.json(appointments);
});

AppointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const appointmentDate = parseISO(date);

    const createAppointment = new CreateAppointmentsServices(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: appointmentDate,
      provider,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default AppointmentsRouter;
