import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../services/CreateAppointmentsServices';
import ensuredAuthenticate from '../middlewares/ensureAuthenticate';

const AppointmentsRouter = Router();

AppointmentsRouter.use(ensuredAuthenticate);
AppointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

AppointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const appointmentDate = parseISO(date);

    const createAppointment = new CreateAppointmentsServices();

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default AppointmentsRouter;
