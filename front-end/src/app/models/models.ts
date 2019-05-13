export interface IAuthResponse {
  token: string;
}

export interface ICompany {
  name: string;
  id: number;
}

export interface IPosition {
  id: number;
  name: string;
  link: string;
  location: string;
  company: ICompany;
  type: string;
}

export interface IUserApplication {
  id: number;
  position: IPosition;
  status: IStatus;
  comment: string;
  recruiter_contact: string;
  applied_at: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface ISchedule {
  id: number;
  event_type: string;
  date: string;
}
