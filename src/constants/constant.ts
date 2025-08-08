export const PAYMENT_TYPE = {
  QPay: 'QPay',
  QPay2: 'QPay2',
  MonPay: 'MonPay',
  SocialPay: 'SocialPay',
  Toki: 'Toki',
  Cash: 'Cash',
  Kart: 'Card',
  Upoint: 'Upoint',
  UPT: 'UPT', //Upoint
  CTE: 'CTE',
  MNQ: 'MNQ',
  UNP: 'UNP',
  GLP: 'GLP',
  MCD: 'MCD',
  XCP: 'XCP',
  MBP: 'MBP',
  MST: 'MST', //most money
};

export const CARD_PAYMENTS = [PAYMENT_TYPE.CTE, PAYMENT_TYPE.MCD];

export const QPAY_BANK_TYPE = {
  KHAAN_BANK: 'Khan bank',
  BOGD_BANK: 'Bogd bank',
  CAPITRON_BANK: 'Capitron bank',
  CHINGIG_KHAAN_BANK: 'Chinggis khaan bank',
  MOST_MONEY: 'Most money',
  NATIONAL_INVESTMENT_BANK: 'National investment bank',
  STATE_BANK: 'State bank',
  TRADE_AND_DEVELOPMENT_BANK: 'Trade and Development bank',
  KHAS_BANK: 'Xac bank',
};

export const DRAFT_TYPE = {
  DRAFT: 'DRAFT',
  NEW: 'NEW', //Хүлээгдэж байна
  ACCEPTED: 'ACCEPTED', //Хүлээн авсан
  COOKING: 'COOKING', //Хоол хийгдэж байна
  READY: 'READY', //Хоол бэлэн болсон
  COMPLETED: 'COMPLETED', //Хоол хүлээн авсан
  CANCELLED: 'CANCELLED', //Хоол цуцалсан
  RETURN: 'RETURN', //Хоол буцаасан
  PROCESSING: 'PROCESSING',
  PREPARING: 'PREPARING',
  PREPARED: 'PREPARED',
  DELIVERING: 'DELIVERING',
  PICKEDUP: 'PICKEDUP',
  MOVED: 'MOVED',
};

export const TYPE = {
  DINIG: 'Dining',
  PRE_ORDER: 'PreOrder',
  TAKE_AWAY: 'TakeAway',
  DELIVERY: 'Delivery',
  MOVE: 'Moved',
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const YEAR_FORMAT = 'YYYY';
export const PATTERN_CODE = '[0-9]{1}'; // Pattern for four digits

export enum MenuItemState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SOLD_OUT = 'SOLD_OUT',
}

export enum DayOfWeek {
  Sunday = 'sun',
  Monday = 'mon',
  Tuesday = 'tue',
  Wednesday = 'wed',
  Thursday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
}

export const kioskConfigs = [
  {
    name: 'noPrint',
    value: 'NO_PRINT',
  },
];

export const SOUND_LINK = 'https://s3.ap-southeast-1.amazonaws.com/images.monarty.mn/typing.mp3';

export const validPrefixes = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'Ө',
  'Р',
  'С',
  'Т',
  'У',
  'Ү',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
  'Я',
];
