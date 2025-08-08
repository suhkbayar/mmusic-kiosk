import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { FiShoppingCart } from 'react-icons/fi';
import { DraftItemsModal } from '..';
import CanteenModal from '../Modal/CanteenModal';
import { CARD_PAYMENTS } from '../../constants/constant';

const Index = () => {
  const { order, participant, config } = useCallStore();
  const { t } = useTranslation('language');
  const [visible, setVisible] = useState(false);
  const [visibleCanteen, setVisibleCanteen] = useState(false);

  const isCanteen = participant.payments.length === 1 && CARD_PAYMENTS.includes(participant.payments[0].type);

  const showDraft = () => {
    if (!isCanteen) {
      setVisible(true);
    } else {
      setVisibleCanteen(true);
    }
  };

  const payment = participant.payments[0];
  return (
    <>
      {!isCanteen ? (
        <div className="  ">
          <div className="w-full  ">
            <div className=" gap-2 place-content-center w-full ">
              <div className="w-full  h-28 ">
                {order && order?.totalQuantity > 0 && (
                  <div className=" bg-gray-200  rounded-t-3xl  drop-shadow-2xl h-full cursor-pointer   p-3 lg:p-4 flex place-content-between animate-quantity-change ">
                    <div className="flex  place-items-center bg-gray-300  px-4 rounded-2xl text-gray-800 text-xl  ">
                      Шинэчлэх
                    </div>
                    <div className="flex gap-8">
                      <div className="text-gray-800 font-semibold  text-xl place-self-center ">
                        {order?.totalAmount} {CURRENCY}
                      </div>

                      <div
                        onClick={() => showDraft()}
                        className="flex relative place-items-center bg-current  px-4 rounded-3xl mr-2"
                      >
                        <FiShoppingCart className="text-white mr-2 lg:text-lg" />
                        <div className="text-white text-xl ">{t('mainPage.Order')}</div>
                        <span className="absolute bg-red-600 top-0 right-0 inline-flex items-center py-0.5 px-2.5 rounded-full text-lg font-medium transform -translate-y-1/2 translate-x-1/2  text-white">
                          {order?.totalQuantity}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CanteenModal
          noPrint={config.noPrint}
          ordered={false}
          visibleCanteen={true}
          payment={payment}
          onClose={() => setVisibleCanteen(false)}
        />
      )}

      <DraftItemsModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default Index;
