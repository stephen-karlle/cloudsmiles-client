

export interface ITime {
  start: Date;
  end: Date;
}


export interface IDentist {
  id: string;
  name: string;
  avatar?: string;
  unavailability?: ITime[]
}

export interface ISelectedDentist {
  id: string;
  name: string;
  avatar?: string;
  unavailability?: ITime[];
  availability: string[];
  appointmentCount: number;
}

interface IPatientData {
  id: string;
  name: string;
}

export interface IAppointment {
  date: Date;
  dentist: ISelectedDentist,
}


interface IAppointmentData {
  treatment: string;
}

export interface IEventData {
  patientData:IPatientData;
  dentistData:IDentist;
  appointmentData:IAppointmentData;
}

export interface IEvent{
  start: Date;
  end: Date;
  data: IEventData;
  status: string;
}


export interface IDayColumns {
  gridColWidth: number;
}

export interface IDentistSubHeader {
  gridColWidth: number;
}


