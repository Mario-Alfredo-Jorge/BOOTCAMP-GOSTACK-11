import uniqid from 'uniqid';

class Appointment {
  id: string;

  provider: string;

  date: Date;


  constructor({ provider,  date}: Omit<Appointment, 'id'>){
    this.id = uniqid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
