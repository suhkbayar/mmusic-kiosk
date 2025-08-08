import { ITimeTable } from './time-table';

export interface IBranch {
  address: string;
  background: any;
  banner: any;
  dayClose: any;
  description: string;
  email: string;
  id: string;
  logo: string;
  name: string;
  website?: string;
  phone: any;
  tags: any[];
  images: any[];
  timetable: ITimeTable;
  type: string;
  services: string[];
  languages: string[];
}
