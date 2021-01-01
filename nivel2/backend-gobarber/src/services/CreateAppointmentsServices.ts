import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointmen';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentsServices {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const parseDate = startOfHour(date);

    const appointmentsRepository = await getCustomRepository(
      AppointmentsRepository,
    );

    const findAppointmentInTheSameDate = await appointmentsRepository.findByDate(
      parseDate,
    );

    if (findAppointmentInTheSameDate) {
      throw Error('This appointment is already booked, try in another date');
    }

    const appointment = await appointmentsRepository.create({
      provider,
      date: parseDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsServices;
