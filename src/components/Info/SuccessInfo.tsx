import React from 'react';
import { useCallStore } from '../../contexts/call.store';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AnimatedBackground, ModalHeader, OrderProcessingScreensaver } from '..';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import { emptyOrder } from '../../mock';
import { isEmpty } from 'lodash';

type SuccessInfoProps = {
  number: string;
};

const Index = ({ number }: SuccessInfoProps) => {
  const { t } = useTranslation('language');
  const router = useRouter();
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const { participant, load } = useCallStore();

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
    <div className={`h-screen bg-[#658DF5]  `}>
      <div className="absolute top-0 w-full p-8">{participant && <ModalHeader />}</div>
      <div className="h-full items-center place-content-center grid gap-10 pb-[20rem]">
        <div className="grid items-center place-content-center justify-items-center">
          <FaRegCheckCircle className="text-success text-[15rem]" />
          <span className="font-semibold text-3xl mb-4 text-gray-600 mt-8 ">{t('mainPage.order_successful')}</span>
        </div>
        <div className="grid  place-items-center p-20 shadow-lg bg-white rounded-3xl    ">
          <span className="font-semibold text-3xl mb-4 text-gray-600 ">{t('mainPage.YourOrderNumber')}</span>
          <div className="text-4xl font-semibold  text-macDonald  ">#{number}</div>
        </div>
        <div className=" w-full bottom-10 justify-self-center">
          <div className=" flex justify-center	">
            <OrderProcessingScreensaver isSolid onClick={newOrder} startInterVal={30000} />
          </div>
        </div>
      </div>

      <AnimatedBackground isWhite={false} />
    </div>
  );
};

export default Index;
