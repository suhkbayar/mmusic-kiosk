import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import router from 'next/router';
import { useCallStore } from '../../contexts/call.store';
import { useTranslation } from 'react-i18next';
import { OrderProcessingScreensaver } from '..';
import { isEmpty } from 'lodash';
type Props = {
  order: any;
  newOrder: () => void;
};

const PaymentFooter = ({ order, newOrder }: Props) => {
  const { t } = useTranslation('language');
  const { participant } = useCallStore();
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

  const goBack = () => {
    if (participant.vat) {
      router.push(`/payment/vat?id=${order.id}`);
    } else {
      router.push(`/restaurant?id=${participant.id}`);
    }
  };
  const NewOrder = () => {
    let paramUrl = localStorage.getItem('paramUrl');

    if (isEmpty(paramUrl)) {
      router.push(`/kiosk?id=${participant.id}`);
    } else {
      router.push(`/kiosk?${paramUrl}`);
    }
  };
  return (
    <div className="fixed bottom-0 right-0 w-full p-12 bg-white border border-gray-100 shadow-lg animate__animated">
      <div className=" flex justify-between	  ">
        <div className="flex justify-start">
          <div
            className="bg-gray-200    py-6 px-8 font-bold rounded-xl text-xl text-gray-500  "
            onClick={() => {
              play();
              goBack();
            }}
          >
            {t('mainPage.GoBack')}
          </div>
        </div>

        <OrderProcessingScreensaver onClick={NewOrder} startInterVal={300000} />
      </div>
    </div>
  );
};

export default PaymentFooter;
