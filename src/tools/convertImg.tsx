import khaan from './img/khanbank.png';
import khasBank from './img/xacbank.png';
import bogdBank from './img/bogdbank.png';
import capitronBank from './img/capitronbank.png';
import ckBank from './img/ckbank.png';
// import most from './img/most.png';
import taniBank from './img/nibank.png';
import stateBank from './img/statebank.png';
import tbd from './img/tdbbank.png';
import { PAYMENT_TYPE, QPAY_BANK_TYPE } from '../constants/constant';
import canteen from '../assets/images/canteen.png';
import cash from './img/cash.png';
import card from './img/card.png';
import qpay from './img/qpay.png';
import monpay from './img/monpay.png';
import socialPay from './img/socialpay.png';
import toki from './img/toki.png';
import upoint from './img/upoint.png';
import unp from './img/union.png';
import qrPay from './img/qrpay.png';

export const ConvertQpayBankImg = (type: any) => {
  switch (type) {
    case QPAY_BANK_TYPE.KHAAN_BANK:
      return khaan.src;
    case QPAY_BANK_TYPE.KHAS_BANK:
      return khasBank.src;
    case QPAY_BANK_TYPE.BOGD_BANK:
      return bogdBank.src;
    case QPAY_BANK_TYPE.CAPITRON_BANK:
      return capitronBank.src;
    case QPAY_BANK_TYPE.CHINGIG_KHAAN_BANK:
      return ckBank.src;
    case QPAY_BANK_TYPE.MOST_MONEY:
      return qrPay.src;
    case QPAY_BANK_TYPE.NATIONAL_INVESTMENT_BANK:
      return taniBank.src;
    case QPAY_BANK_TYPE.STATE_BANK:
      return stateBank.src;
    case QPAY_BANK_TYPE.TRADE_AND_DEVELOPMENT_BANK:
      return tbd.src;
    default:
      return qpay.src;
  }
};

export const ConvertIppos = (type: any) => {
  switch (type) {
    case PAYMENT_TYPE.GLP:
      return card.src;
    default:
      return card.src;
  }
};

export const ConvertBankImg = (type: any) => {
  switch (type) {
    case PAYMENT_TYPE.Cash:
      return cash.src;
    case PAYMENT_TYPE.Kart:
      return card.src;
    case PAYMENT_TYPE.QPay:
      return qpay.src;
    case PAYMENT_TYPE.MonPay:
      return monpay.src;
    case PAYMENT_TYPE.SocialPay:
      return socialPay.src;
    case PAYMENT_TYPE.Toki:
      return toki.src;
    case PAYMENT_TYPE.UPT:
    case PAYMENT_TYPE.Upoint:
      return upoint.src;
    case PAYMENT_TYPE.MNQ:
      return monpay.src;
    case PAYMENT_TYPE.UNP:
      return unp.src;
    case PAYMENT_TYPE.CTE:
      return canteen.src;
    case PAYMENT_TYPE.MCD:
      return canteen.src;
    case PAYMENT_TYPE.MST:
      return qrPay.src;

    default:
      return type;
  }
};
