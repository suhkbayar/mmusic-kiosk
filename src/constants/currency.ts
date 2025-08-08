import { getPayload } from '../providers/auth';

const currency = getPayload()?.currency;
export const CURRENCY = currency ? currency : 'MNT';
