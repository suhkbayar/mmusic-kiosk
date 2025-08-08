import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import list from '../../assets/images/Order.png';
import { useCallStore } from '../../contexts/call.store';
import { CURRENCY } from '../../constants/currency';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const Index = ({ visible, onClose, onConfirm }: Props) => {
  const { t } = useTranslation('language');
  const { order } = useCallStore();

  return (
    <Modal show={visible} theme={customThemeWaiterModal} className="flex h-96" onClose={() => onClose()}>
      <Modal.Body className="p-1">
        <div className="flex place-content-center">
          <img src={list.src} className="w-36 h-36" />
        </div>
        <div className="text-sm mt-2 text-misty text-center font-semibold ">{t('mainPage.PayAtTheBoxOffice')} ?</div>

        <div className="flex justify-around">
          <div className="text-sm mt-2 text-misty text-center font-semibold ">{t('mainPage.Total')} </div>
          <div className="text-sm mt-2 text-misty text-center font-semibold ">
            {order?.grandTotal.toLocaleString()} {CURRENCY}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <div
            onClick={() => onClose()}
            className="w-8/12 flex place-content-center justify-center bg-white border border-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-current   font-semibold ">{t('mainPage.No')}</span>
          </div>

          <div
            onClick={() => onConfirm()}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.Yes')}</span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
