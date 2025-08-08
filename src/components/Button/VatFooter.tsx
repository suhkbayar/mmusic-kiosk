import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import router from 'next/router';
import { useCallStore } from '../../contexts/call.store';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useEffect, useState } from 'react';
import { OrderProcessingScreensaver } from '..';
import { emptyOrder } from '../../mock';
type Props = {
  id: string;
  vatType?: string;
  buyer?: string;
  buyerRegister?: string;
};

const VatFooter = ({ id, vatType, buyer, buyerRegister }: Props) => {
  const { t } = useTranslation('language');
  const [isProcessing, setIsProcessing] = useState(false);
  let inactivityTimer: NodeJS.Timeout;
  let processingTimer: NodeJS.Timeout;

  const { participant, load, order } = useCallStore();
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

  const goBack = () => {
    router.push(`/restaurant?id=${participant.id}`);
  };
  const isContinueButtonEnabled = () => {
    if (vatType === '3') {
      return !isEmpty(buyer);
    } else if (vatType === '1') {
      return true;
    }
  };

  const resetTimers = () => {
    clearTimeout(inactivityTimer);
    clearTimeout(processingTimer);
    setIsProcessing(false);
    startInactivityTimer();
  };

  const startInactivityTimer = () => {
    inactivityTimer = setTimeout(() => {
      setIsProcessing(true);
    }, 30000); // 30000 Wait 30s before starting processing
  };

  useEffect(() => {
    startInactivityTimer();

    const handleUserActivity = () => {
      resetTimers();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(processingTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };
  }, []);

  const newOrder = () => {
    router.push(`/kiosk?id=${participant.id}`);
    load(emptyOrder);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full p-12 bg-white border border-gray-100 shadow-lg animate__animated">
      <div className=" flex justify-between	  ">
        {isProcessing ? (
          <OrderProcessingScreensaver onClick={newOrder} startInterVal={100} />
        ) : (
          <div className="flex justify-start">
            <div
              className="bg-gray-200    py-6 px-8 font-semibold rounded-xl text-xl text-gray-500  "
              onClick={() => {
                play();
                goBack();
              }}
            >
              {t('mainPage.GoBack')}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isContinueButtonEnabled()}
            className={`py-6 px-8 font-semibold flex gap-4 rounded-xl text-xl ${
              isContinueButtonEnabled() ? 'bg-macDonald text-white button' : 'bg-gray-200 text-white button-variant'
            }`}
          >
            <span>
              {t('mainPage.ToBeContinued')} {order?.totalQuantity > 0 && <span>({order?.totalQuantity})</span>}
            </span>
            <span>
              {order?.totalAmount.toLocaleString()} {CURRENCY}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VatFooter;
