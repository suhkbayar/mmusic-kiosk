import { QPAY_BANK_TYPE, TYPE } from '../constants/constant';
import { ICustomerOrder, IOrder } from '../types';

export const foodTypes = [
  {
    key: '1',
    name: 'AppleJuice',
    count: 5,
    field: 'AppleJuice',
  },
  {
    key: '2',
    name: `BB.Q`,
    count: 1,
    field: 'BB.Q',
  },
  {
    key: '3',
    name: `Beef Roast`,
    count: 4,
    field: 'Beef Roast',
  },
  {
    key: '4',
    name: `Carrot Juice`,
    count: 18,
    field: 'Carrot Juice',
  },
  {
    key: '5',
    name: `Cheese Burger`,
    count: 1,
    field: 'Cheese Burger',
  },
  {
    key: '6',
    name: `Cheicken Roast`,
    count: 19,
    field: 'Cheicken Roast',
  },
];

export interface KeyValuePair {
  key: any;
  label: any;
}

export const qpyBanks = [
  {
    type: QPAY_BANK_TYPE.KHAAN_BANK,
  },
  {
    type: QPAY_BANK_TYPE.BOGD_BANK,
  },
  {
    type: QPAY_BANK_TYPE.CAPITRON_BANK,
  },
  {
    type: QPAY_BANK_TYPE.CHINGIG_KHAAN_BANK,
  },
  {
    type: QPAY_BANK_TYPE.MOST_MONEY,
  },

  {
    type: QPAY_BANK_TYPE.STATE_BANK,
  },
  {
    type: QPAY_BANK_TYPE.TRADE_AND_DEVELOPMENT_BANK,
  },
  {
    type: QPAY_BANK_TYPE.KHAS_BANK,
  },
];

export interface CreateOrderInput {
  contact: string;
  name: string;
  guests: any;
  deliveryDate: string;
  comment: string;
  address: string;
}

export const emptyOrder: ICustomerOrder = {
  items: [],
  totalAmount: 0,
  type: null,
  totalQuantity: 0,
  grandTotal: 0,
  state: '',
  buyer: null,
  register: null,
  vatType: '1',
};

export const PreOrderField = ['contact', 'name', 'guests'];
export const DeliveryField = ['contact', 'name', 'address', 'comment', 'deliveryDate'];
export const TakeAwayField = ['contact', 'name', 'deliveryDate'];

export const getMonths: KeyValuePair[] = [
  {
    key: '1',
    label: '1',
  },
  {
    key: '2',
    label: '2',
  },
  {
    key: '3',
    label: '3',
  },
  {
    key: '4',
    label: '4',
  },
  {
    key: '5',
    label: '5',
  },
  {
    key: '6',
    label: '6',
  },
  {
    key: '7',
    label: '7',
  },
  {
    key: '8',
    label: '8',
  },
  {
    key: '9',
    label: '9',
  },
  {
    key: '10',
    label: '10',
  },
  {
    key: '11',
    label: '11',
  },
  {
    key: '12',
    label: '12',
  },
];

export const getDays: KeyValuePair[] = [
  {
    key: '1',
    label: '1',
  },
  {
    key: '2',
    label: '2',
  },
  {
    key: '3',
    label: '3',
  },
  {
    key: '4',
    label: '4',
  },
  {
    key: '5',
    label: '5',
  },
  {
    key: '6',
    label: '6',
  },
  {
    key: '7',
    label: '7',
  },
  {
    key: '8',
    label: '8',
  },
  {
    key: '9',
    label: '9',
  },
  {
    key: '10',
    label: '10',
  },
  {
    key: '11',
    label: '11',
  },
  {
    key: '12',
    label: '12',
  },
];

interface DayMapping {
  [key: string]: string;
}

export const convertDays: DayMapping[] = [
  {
    Sunday: 'Sunday',
    key: 'sun',
    close: 'sunClose',
    open: 'sunOpen',
  },
  {
    Monday: 'Monday',
    key: 'mon',
    close: 'monClose',
    open: 'monOpen',
  },
  {
    Tuesday: 'Tuesday',
    key: 'tue',
    close: 'tueClose',
    open: 'tueOpen',
  },
  {
    Wednesday: 'Wednesday',
    key: 'wed',
    close: 'wedClose',
    open: 'wedOpen',
  },
  {
    Thursday: 'Thursday',
    key: 'thu',
    close: 'thuClose',
    open: 'thuOpen',
  },
  {
    Friday: 'Friday',
    key: 'fri',
    close: 'friClose',
    open: 'friOpen',
  },
  {
    Saturday: 'Saturday',
    key: 'sat',
    close: 'satClose',
    open: 'satOpen',
  },
];

export const PeopleNumber = [
  {
    val: 1,
    name: '1 хүн',
  },
  {
    val: 2,
    name: '2 хүн',
  },
  {
    val: 3,
    name: '3 хүн',
  },
  {
    val: 4,
    name: '4 хүн',
  },
  {
    val: 5,
    name: '5 хүн',
  },
  {
    val: 6,
    name: '6 хүн',
  },
  {
    val: 7,
    name: '7 хүн',
  },
  {
    val: 8,
    name: '8 хүн',
  },
  {
    val: 9,
    name: '9 хүн',
  },
  {
    val: 10,
    name: '10 хүн',
  },
  {
    val: 11,
    name: '11 хүн',
  },
  {
    val: 12,
    name: '12 хүн',
  },
  {
    val: 13,
    name: '13 хүн',
  },
  {
    val: 14,
    name: '14 хүн',
  },
  {
    val: 15,
    name: '15 хүн',
  },
  {
    val: 16,
    name: '16 хүн',
  },
  {
    val: 17,
    name: '17 хүн',
  },
  {
    val: 18,
    name: '18 хүн',
  },
  {
    val: 19,
    name: '19 хүн',
  },
  {
    val: 20,
    name: '20 хүн',
  },
];
