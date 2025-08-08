import React from 'react';
import { Modal } from 'flowbite-react';
import useNotificationStore from '../../contexts/notificationStore';
import { customAlertModal } from '../../../styles/themes';
import error from '../../assets/icons/error.svg';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

export const AlertModal = () => {
  const { t } = useTranslation('language');
  const { visible, alertType, message, onCloseAlert, title } = useNotificationStore();

  if (!visible) return null;

  return (
    <Modal show={visible} theme={customAlertModal} className="flex h-96" onClose={() => onCloseAlert()}>
      <Modal.Body className="p-1">
        <div className="flex place-content-center">
          {alertType === 'error' && <img src={error.src} />}
          {alertType === 'success' && (
            <div className=" h-24 w-24">
              <AiOutlineCheckCircle className="text-success text-2xl h-full w-full " />
            </div>
          )}

          {alertType === 'warning' && (
            <div className=" h-24 w-24">
              <AiOutlineWarning className="text-coral text-2xl h-full w-full " />
            </div>
          )}
        </div>
        <div className="grid gap-2 place-items-center w-full">
          <span className="text-lg font-normal">{title}</span>
          <span className=" text-xl text-misty  font-normal">{message}</span>
        </div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <div
            onClick={() => onCloseAlert()}
            className="w-8/12 flex place-content-center h-16 place-items-center justify-center bg-white border border-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-xl text-current   font-semibold ">{t('mainPage.Close')}</span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
