import React from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { numberFormat } from '../../utils';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import useNotificationStore from '../../contexts/notificationStore';

type Props = {
  loading: boolean;
  grandTotal: any;
  paymentType: string;
  showCashier: () => void;
};

const Index = ({ loading, grandTotal, paymentType, showCashier }: Props) => {
  const { t } = useTranslation('language');
  const router = useRouter();
  const { showAlert } = useNotificationStore();

  const { participant } = useCallStore();

  const onNewOrder = () => {
    let parentId = localStorage.getItem('parentId');
    if (isEmpty(parentId)) {
      router.push(`/kiosk?id=${participant.id}`);
    } else {
      router.push(`/parent?id=${parentId}`);
    }
  };

  const onOrder = () => {
    if (isEmpty(paymentType)) {
      showAlert(true, 'warning', t('mainPage.SelectYourPaymentChannel'), '');
    }
  };

  return (
    <>
      <div className=" fixed  cursor-pointer bottom-0 sm:bottom-0 transition-all duration-500  md:bottom-5 lg:bottom-5 w-full   sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12 ">
        <div className="bg-white pl-4 pr-4 pt-4 pb-2 rounded-t-lg  ">
          {!participant.advancePayment && (
            <div
              onClick={() => showCashier()}
              className="w-full mb-3 flex place-content-center  place-items-center border border-current rounded-lg px-4 py-3 bg-white"
            >
              <span className="text-current">{t('mainPage.PayAtTheBoxOffice')}</span>
            </div>
          )}
          <button
            onClick={() => onOrder()}
            type="submit"
            className={`w-full flex h-16 place-content-between place-items-center rounded-lg px-4 py-3 ${
              isEmpty(paymentType) ? 'bg-grayish ' : 'bg-current   hover:bg-current '
            }  text-white duration-300`}
          >
            {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
            <span className="text-lg">{t('mainPage.Payment')}</span>
            <span
              className={`p-1 rounded-lg text-lg ${
                isEmpty(paymentType) ? 'bg-grayish ' : 'bg-coral '
              } font-semibold text-white`}
            >
              {numberFormat.format(grandTotal)} {CURRENCY}
            </span>
          </button>

          <div
            onClick={() => onNewOrder()}
            className="w-full mb-3 mt-4 flex place-content-center  place-items-center border border-current rounded-lg px-4 py-3 bg-white"
          >
            <span className="text-current">{t('mainPage.MakeNewOrder')}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
