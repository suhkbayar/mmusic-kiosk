import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemePaymentModal } from '../../../styles/themes';
import QRCode from 'qrcode';
import { ITransaction } from '../../types';
import card from '../../tools/img/card-primary.png';
import { TfiClose } from 'react-icons/tfi';

type Props = {
  visible: boolean;
  onClose: () => void;
  refetch: (transactionId: any) => void;
  transaction: ITransaction;
};

const base64Types = ['QPay', 'QPay2'];

const Index = ({ visible, onClose, refetch, transaction }: Props) => {
  const { t } = useTranslation('language');
  const [imageqrcUrl, setImageUrl] = useState<string>('');

  const generateUrl = async (data: any) => {
    try {
      const url = await QRCode.toDataURL([{ data: data, mode: 'byte' }], { errorCorrectionLevel: 'M' });
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (transaction && transaction.type === 'UNP') {
      generateUrl(transaction.image);
    }
  }, [transaction]);

  const getImageUrl = (): string => {
    if (base64Types.includes(transaction.type)) {
      return `data:image/jpeg;base64,${transaction.image}`;
    }
    return transaction.type === 'UNP' ? imageqrcUrl : transaction.image;
  };

  const imageUrl = getImageUrl();

  return (
    <Modal show={visible} theme={customThemePaymentModal} className={`flex h-96`} onClose={onClose}>
      <Modal.Body className={`p-1 h-30 ${transaction?.type !== 'GLP' ? '' : 'h-30'} `}>
        <div className=" flex w-full place-content-end ">
          {transaction?.type !== 'GLP' && (
            <div className="p-4 rounded-full bg-gray-100" onClick={onClose}>
              <TfiClose className="text-gray-700 text-2xl" />
            </div>
          )}
        </div>

        {transaction?.type !== 'GLP' ? (
          <div className="flex place-content-center h-full">
            <img src={imageUrl} className="w-64 h-64" alt="QR Code" />
          </div>
        ) : (
          <div className="w-full h-[15rem] justify-center flex items-center ">
            <img className={`w-36 rounded-lg  text-red  mb-2`} src={card.src} alt="Bank" />
          </div>
        )}
        <div
          className={`grid gap-2 place-items-center w-full mt-2 ${transaction?.type !== 'GLP' ? '' : ' mb-[4rem]'}  `}
        >
          <span className=" text-lg text-misty font-normal text-center">
            {transaction?.type !== 'GLP' ? t('mainPage.scan_qr_code') : t('mainPage.swipe_card')}
          </span>
        </div>
      </Modal.Body>
      {transaction?.type !== 'GLP' && (
        <Modal.Footer className="place-content-center">
          <div className="grid gap-2 place-items-center w-full">
            <div
              onClick={() => refetch(transaction.id)}
              className="w-8/12  h-16 flex place-items-center place-content-center justify-center bg-macDonald p-3 rounded-lg cursor-pointer"
            >
              <span className="block text-base text-white font-semibold">{t('mainPage.Paid')}</span>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Index;
