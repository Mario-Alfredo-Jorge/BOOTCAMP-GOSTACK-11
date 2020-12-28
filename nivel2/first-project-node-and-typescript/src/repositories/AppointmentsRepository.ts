import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment';

interface createAppointmentDTO{
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];


  constructor(){
    this.appointments = []
  }

  public create({ provider, date }: createAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null{
    const findDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return findDate || null;
  }

  public returnAll(): Appointment[] {
    return this.appointments;
  }

}
export default AppointmentsRepository;
