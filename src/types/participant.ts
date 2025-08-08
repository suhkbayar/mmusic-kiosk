import { IChannelConfig } from '.';
import { IBranch } from './branch';
import { IMenu } from './menu';
import { IPayment } from './payment';

export interface IParticipant {
  advancePayment: boolean;
  branch: IBranch;
  id: string;
  channel: string;
  configs?: IChannelConfig[];
  menu: IMenu;
  waiter: boolean;
  orderable: boolean;
  payments: IPayment[];
  services: string[];
  vat: boolean;
  token: string;
}
