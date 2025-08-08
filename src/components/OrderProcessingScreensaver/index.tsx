import React, { useEffect, useState } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { useRouter } from 'next/router';
import { emptyOrder } from '../../mock';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
type Props = {
  startInterVal: number;
  onClick: () => void;
  isSolid?: boolean;
};

const OrderProcessingScreensaver = ({ startInterVal, onClick, isSolid = false }: Props) => {
  const router = useRouter();
  const { t } = useTranslation('language');
  const { participant, load } = useCallStore();

  const [isProcessing, setIsProcessing] = useState(false);
  let inactivityTimer: NodeJS.Timeout;
  let processingTimer: NodeJS.Timeout;

  const resetTimers = () => {
    clearTimeout(inactivityTimer);
    clearTimeout(processingTimer);
    setIsProcessing(false);
    startInactivityTimer();
  };

  const startInactivityTimer = () => {
    inactivityTimer = setTimeout(() => {
      setIsProcessing(true);
      processingTimer = setTimeout(newOrder, 30000); // Start new order after 5s
    }, startInterVal); // 30000 Wait 30s before starting processing
  };

  const newOrder = () => {
    let parentId = localStorage.getItem('parentId');
    if (isEmpty(parentId)) {
      router.push(`/kiosk?id=${participant.id}`);
      load(emptyOrder);
    } else {
      router.push(`/parent?id=${parentId}`);
      load(emptyOrder);
    }
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

  return (
    <div className="flex justify-start">
      <div
        onClick={() => {
          onClick();
        }}
        className={`${
          isProcessing ? 'loader-screen-saver' : `${isSolid ? 'bg-macDonald text-white' : 'g-white'} shadow-lg`
        }  bg-gray-200 py-6 px-8 font-bold rounded-xl text-xl text-gray-500`}
      >
        {t('mainPage.NewOrder')}
      </div>
    </div>
  );
};

export default OrderProcessingScreensaver;
