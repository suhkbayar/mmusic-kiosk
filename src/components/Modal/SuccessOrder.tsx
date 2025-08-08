import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import { useRouter } from 'next/router';
import { useCallStore } from '../../contexts/call.store';
import { emptyOrder } from '../../mock';

import { AiFillCheckCircle } from 'react-icons/ai';

type Props = {
  visible: boolean;
  orderNumber: any;
  onClickPrint: () => void;
};

const Index = ({ visible, orderNumber, onClickPrint }: Props) => {
  const { t } = useTranslation('language');
  const router = useRouter();

  const { participant, load } = useCallStore();

  const goBack = () => {
    load(emptyOrder);
    router.push(`/restaurant?id=${participant.id}`);
  };

  return (
    <Modal show={visible} theme={customThemeWaiterModal} className="flex h-96">
      <Modal.Body className="p-1">
        <div className="flex place-content-center">
          <div className=" h-24 w-24">
            <AiFillCheckCircle className="text-success text-2xl h-full w-full " />
          </div>
        </div>
        <div className="text-sm mt-2 text-misty text-center font-semibold ">{t('mainPage.YourOrderSuccess')} </div>

        <div className="text-sm flex gap-2 place-content-center mt-2 text-misty text-center font-semibold ">
          <p>{t('mainPage.YourOrderNumber')}:</p>
          <p className="text-current">{orderNumber.slice(-4)} </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <div
            onClick={() => onClickPrint()}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-white   font-semibold ">Дахин хэвлэх</span>
          </div>

          <div
            onClick={() => goBack()}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.GoBack')}</span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
