import moment from 'moment';

export const dateFormat = (date: Date, format: string) => moment(date).format(format);

export const moneyFormat = (value: number) =>
  new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT' }).format(value).replace('MNT', '');
