import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointmen';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentsServices {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const parseDate = startOfHour(date);

    const findAppointmentInTheSameDate = this.appointmentsRepository.findByDate(
      parseDate,
    );

    if (findAppointmentInTheSameDate) {
      throw Error('This appointment is already booked, try in another date');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: parseDate,
    });

    return appointment;
  }
}

export default CreateAppointmentsServices;
