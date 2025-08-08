import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import { CgSpinner } from 'react-icons/cg';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

type Props = {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  onConfirm: () => void;
};

const Index = ({ visible, onClose, onConfirm, loading }: Props) => {
  const { t } = useTranslation('language');

  return (
    <Modal show={visible} theme={customThemeWaiterModal} className="flex h-96" onClose={() => onClose()}>
      <Modal.Body className="p-1">
        <Alert
          additionalContent={t('mainPage.isAdultsOnlyDescription')}
          className="text-lg"
          color="warning"
          icon={HiInformationCircle}
        >
          <span>
            <p>
              <span className="font-medium text-lg"> {t('mainPage.isAdultsOnly')} </span>
            </p>
          </span>
        </Alert>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className=" gap-2 place-items-center flex w-full">
          <div
            onClick={() => onClose()}
            className="w-[50%] flex place-content-center justify-center bg-white border border-macDonald p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-lg text-macDonald   font-semibold ">{t('mainPage.No')}</span>
          </div>

          <button
            disabled={loading}
            onClick={() => onConfirm()}
            className="w-[50%] flex place-content-center justify-center bg-macDonald p-3 rounded-lg cursor-pointer"
          >
            {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
            <span className="block  text-lg text-white   font-semibold ">{t('mainPage.Yes')}</span>
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
