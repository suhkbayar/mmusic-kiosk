import { Modal } from 'flowbite-react';
import { ITransaction } from '../../types';
import { customThemePaymentModal } from '../../../styles/themes';
import card from '../../tools/img/card-primary.png';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import useNotificationStore from '../../contexts/notificationStore';

type Props = {
  visible: boolean;
  onClose: () => void;
  refetch: (transactionId: any) => void;
  transaction: ITransaction;
};

const Index = ({ visible, onClose, refetch, transaction }: Props) => {
  const { t } = useTranslation('language');
  const { showNotification } = useNotificationStore();

  const sendRequest = async (transaction) => {
    const request = {
      Amount: parseFloat(transaction.amount),
      ReqNo: '',
    };

    const url: string = 'http://localhost:8501/mbank/sale';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        mode: 'cors',
      });

      if (response.status === 200) {
        refetch(transaction.id);
      } else {
        const data = await response.json();

        const { message } = await JSON.parse(data);

        showNotification('error', message);
        onClose();
      }
    } catch (error) {
      showNotification('error', 'Амжилтгүй');
      onClose();
    }
  };

  useEffect(() => {
    if (transaction) {
      if (visible) sendRequest(transaction);
    }
  }, [transaction, visible]);

  return (
    <Modal show={visible} theme={customThemePaymentModal} className={`flex h-96`} onClose={onClose}>
      <Modal.Body className={`p-1 h-30 'h-30 `}>
        <div className="w-full h-[15rem] justify-center flex items-center ">
          <img className={`w-36 rounded-lg  text-red  mb-2`} src={card.src} alt="Bank" />
        </div>
        <div className={`grid gap-2 place-items-center w-full mt-2  ' mb-[4rem] `}>
          <span className=" text-lg text-misty font-normal text-center">{t('mainPage.swipe_card')}</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Index;
