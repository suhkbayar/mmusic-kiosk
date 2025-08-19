import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemePaymentModal } from '../../../styles/themes';
import { TfiClose } from 'react-icons/tfi';
import { useCallStore } from '../../contexts/call.store';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import router from 'next/router';
import { emptyOrder } from '../../mock';
import { CiWarning } from 'react-icons/ci';
import { isEmpty } from 'lodash';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const Index = ({ visible, onClose }: Props) => {
  const { t } = useTranslation('language');
  const { participant, load } = useCallStore();
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });

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
    <Modal show={visible} theme={customThemePaymentModal} className={`flex h-96`} onClose={onClose}>
      <Modal.Body className={`p-1 h-30 `}>
        <div className=" flex w-full place-content-end ">
          <div className="p-4 rounded-full bg-gray-100" onClick={onClose}>
            <TfiClose className="text-gray-700 text-2xl" />
          </div>
        </div>
        <div className="w-full h-[15rem] justify-center flex items-center ">
          <CiWarning className=" text-macDonald h-[8rem] w-[8rem] rounded-lg  text-red  mb-2" />
        </div>
        <div className={`grid gap-2 place-items-center w-full mt-2  mb-[4rem]  `}>
          <span className=" text-xl text-misty font-normal text-center">{t('mainPage.confirm_new_order')}</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="place-content-center">
        <div className="flex gap-2 place-items-center w-full">
          <div
            onClick={() => onClose()}
            className="w-2/4	  h-16 flex place-items-center place-content-center justify-center bg-white border border-macDonald p-3 rounded-lg cursor-pointer"
          >
            <span className="block text-base text-macDonald font-semibold">{t('mainPage.No')}</span>
          </div>
          <div
            onClick={() => newOrder()}
            className="w-2/4	  h-16 flex place-items-center place-content-center justify-center bg-macDonald p-3 rounded-lg cursor-pointer"
          >
            <span className="block text-base text-white font-semibold">{t('mainPage.Yes')}</span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
