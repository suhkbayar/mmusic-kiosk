import useSound from 'use-sound';
import { CARD_PAYMENTS, SOUND_LINK } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { CURRENCY } from '../../constants/currency';
import { moneyFormat } from '../../helpers/formatters';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CanteenModal from '../Modal/CanteenModal';
import { useRouter } from 'next/router';
import DraftOrderModal from '../Modal/DraftOrderModal';
import { emptyOrder } from '../../mock';
import { OrderProcessingScreensaver } from '..';
import { isEmpty } from 'lodash';
import MkaraokeButton from './MkaraokeButton';

const OrderFooter = () => {
  const router = useRouter();
  const { order, participant, config, load } = useCallStore();
  const { t } = useTranslation('language');
  const [visible, setVisible] = useState(false);
  const [visibleCanteen, setVisibleCanteen] = useState(false);

  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

  const isCanteen = participant.payments.length === 1 && CARD_PAYMENTS.includes(participant.payments[0].type);
  const payment = participant.payments[0];

  const showDraft = () => {
    if (!isCanteen) {
      setVisible(true);
    } else {
      setVisibleCanteen(true);
    }
  };

  const newOrder = () => {
    play();

    let paramUrl = localStorage.getItem('paramUrl');

    if (isEmpty(paramUrl)) {
      router.push(`/kiosk?id=${participant.id}`);
    } else {
      router.push(`/kiosk?${paramUrl}`);
    }

    load(emptyOrder);
  };

  return (
    <>
      {!isCanteen ? (
        <div className="fixed bottom-0 w-full p-12 bg-white border border-gray-100 shadow-lg animate__animated">
          <div className="flex justify-between ml-[10rem]">
            <div className="flex justify-start">
              <OrderProcessingScreensaver onClick={newOrder} startInterVal={30000} />
            </div>
            <div className="flex justify-end">
              <div
                className={`${
                  order?.totalQuantity > 0 ? 'bg-macDonald button ' : 'bg-gray-200  button-variant'
                }  py-6 px-8 font-bold flex gap-4 rounded-xl text-xl text-white`}
                onClick={() => {
                  play();
                  if (order?.totalQuantity > 0) {
                    showDraft();
                  }
                }}
              >
                <span>
                  {t('mainPage.Order')} {order?.totalQuantity > 0 && <span>({order?.totalQuantity})</span>}
                </span>
                <span>
                  {moneyFormat(order?.totalAmount)} {CURRENCY}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 w-full p-12 bg-white border border-gray-100 shadow-lg animate__animated">
          <div className="  ml-[10rem]">
            <div className="flex justify-start">
              <OrderProcessingScreensaver onClick={newOrder} startInterVal={30000000000} />
            </div>
            <div className="mr-[10rem]">
              <CanteenModal
                noPrint={config.noPrint}
                ordered={false}
                visibleCanteen={true}
                payment={payment}
                onClose={() => setVisibleCanteen(false)}
              />
            </div>
          </div>
        </div>
      )}
      <MkaraokeButton />
      <DraftOrderModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default OrderFooter;
