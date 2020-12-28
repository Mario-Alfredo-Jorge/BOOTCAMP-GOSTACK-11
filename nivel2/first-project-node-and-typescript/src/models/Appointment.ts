import uniqid from 'uniqid';

class Appointment {
  id: string;

  provider: string;

  date: Date;


  constructor(provider: string, date:Date){
    this.id = uniqid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
