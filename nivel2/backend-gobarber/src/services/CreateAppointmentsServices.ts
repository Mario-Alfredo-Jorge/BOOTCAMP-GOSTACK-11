import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointmen';

interface Request {
  date: Date;
  provider_id: string;
}

class CreateAppointmentsServices {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = await getCustomRepository(
      AppointmentsRepository,
    );

    const parseDate = startOfHour(date);

    const findAppointmentInTheSameDate = await appointmentsRepository.findByDate(
      parseDate,
    );

    if (findAppointmentInTheSameDate) {
      throw Error('This appointment is already booked, try in another date');
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: parseDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsServices;
