import { Modal } from 'flowbite-react';
import React, { useRef, useState, useEffect } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { useMutation } from '@apollo/client';
import canteen from '../../assets/images/canteen.png';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import RecieptCanteen from '../Print/Canteen';
import { CREATE_ORDER, GET_PAY_ORDER } from '../../graphql/mutation/order';
import { customCanteenModal } from '../../../styles/themes';
import { IOrder } from '../../types';
import { GET_ORDERS } from '../../graphql/query';
import useNotificationStore from '../../contexts/notificationStore';
import { CURRENCY } from '../../constants/currency';
import { TfiClose } from 'react-icons/tfi';
import { moneyFormat } from '../../helpers/formatters';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import OrderProcessingScreensaver from '../OrderProcessingScreensaver';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
type Props = {
  noPrint: boolean;
  payment: any;
  visibleCanteen: boolean;
  ordered: any;
  onClose: () => void;
};

const CanteenModal = ({ noPrint, payment, visibleCanteen, ordered, onClose }: Props) => {
  const { t } = useTranslation('language');
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const printRef = useRef(null);
  const { order, participant, removeOrder } = useCallStore();
  const inputRef: any = useRef(null);
  const [printOrder, setPrintOrder] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [employeeBalance, setEmployeeBalance] = useState(0);
  const { showAlert } = useNotificationStore();
  const router = useRouter();
  const [payOrder, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      setEmployeeBalance(data?.payOrder?.transaction?.balance);
      setPrintOrder(data?.payOrder?.order);
      if (noPrint) {
        showAlert(
          true,
          'success',
          'Амжилттай',
          `${data?.payOrder?.order.name && data?.payOrder?.order.name}. \n Таны захиалга амжилттай биеллээ.`,
        );
      } else {
        onPrint();
      }
      removeOrder();
      setVisible(false);
    },
    onError(err) {
      setVisible(false);
      removeOrder();
      onClose();
      showAlert(true, 'warning', 'Амжилтгүй', err.message);
    },
  });

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    update(cache, { data: { createOrder } }) {
      const caches = cache.readQuery<{ getOrders: IOrder[] }>({ query: GET_ORDERS });
      if (caches && caches.getOrders) {
        cache.writeQuery({
          query: GET_ORDERS,
          data: { getOrders: caches.getOrders.concat([createOrder]) },
        });
      }
    },
    onCompleted: (data) => {
      setPrintOrder(data.createOrder);
      setVisible(true);
    },
    onError(err) {
      showAlert(true, 'warning', 'Амжилтгүй', err.message);
    },
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length >= 10 && inputValue) {
      payOrder({
        variables: {
          input: {
            confirm: false,
            code: inputRef?.current?.value,
            order: ordered ? ordered?.id : printOrder?.id,
            payment: payment?.id,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (ordered) {
      setVisible(true);
    }
  }, [visibleCanteen]);

  const clickDraft = () => {
    if (order.items.length === 0) return;
    let items = order?.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      comment: item.comment,
      options: item.options.map((option) => ({
        id: option.id,
        value: option.value,
      })),
    }));
    createOrder({
      variables: {
        participant: participant.id,
        input: {
          type: 'Dining',
          deliveryDate: '',
          contact: '',
          address: '',
          name: '',
          comment: '',
          guests: 1,
          items: items,
        },
      },
    });
  };

  useEffect(() => {
    if (!visible) return;

    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
      inputRef?.current?.addEventListener('input', handleInputChange);
    }, 100);
  }, [visible]);

  const onPrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      onClose();
      const printOptions = {
        options: {
          silent: true,
        },
      };
      return Promise.resolve(printOptions);
    },
  });

  const close = () => {
    setVisible(false);
    removeOrder();
  };
  const newOrder = () => {
    play();

    let parentId = localStorage.getItem('parentId');

    if (isEmpty(parentId)) {
      router.push(`/kiosk?id=${participant.id}`);
    } else {
      router.push(`/parent?id=${parentId}`);
    }
  };

  return (
    <>
      {' '}
      {visibleCanteen && (
        <div className="w-full flex justify-center">
          {printOrder && (
            <RecieptCanteen employeeBalance={employeeBalance} ref={printRef} order={printOrder} withVat={false} />
          )}
          {order && order?.totalQuantity > 0 && !ordered && (
            <div className="fixed bottom-0 w-full p-12 bg-white border border-gray-100 shadow-lg animate__animated">
              <div className=" flex justify-between	  ml-[10rem] ">
                <div className="flex justify-start">
                  <div className="flex justify-start">
                    <OrderProcessingScreensaver onClick={newOrder} startInterVal={30000} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className={`${
                      order?.totalQuantity > 0 ? 'bg-macDonald button ' : 'bg-gray-200  button-variant'
                    }  py-6 px-8 font-semibold flex gap-4 rounded-xl text-xl text-white  `}
                    onClick={() => {
                      play();
                      clickDraft();
                    }}
                  >
                    <span>Захиалах {order?.totalQuantity > 0 && <span>({order?.totalQuantity})</span>}</span>
                    <span>
                      {moneyFormat(order?.totalAmount)} {CURRENCY}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Modal theme={customCanteenModal} show={visible} className="w-full ">
            {!loading && (
              <Modal.Body className="flex flex-col align-center justify-center">
                <span className="self-center font-semibold  text-xl text-macDonald ">Картаа уншуулна уу</span>
                <div className="absolute right-2 top-2 ">
                  <div className="flex p-4 bg-gray-200 rounded-full ">
                    <TfiClose onClick={close} className="text-black w-5 h-5 " />
                  </div>
                </div>

                <img className="self-center w-52 " src={canteen.src} alt="" />

                <div style={{ position: 'fixed', right: '5000px' }}>
                  <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
                    <input
                      key={'input'}
                      defaultValue={''}
                      autoFocus
                      autoComplete={'new-password'}
                      id="card-input"
                      style={{ color: 'white', border: 'none', backgroundColor: 'transparent' }}
                      ref={inputRef}
                      disabled={paying}
                    />
                  </form>
                </div>
                <div className={'arrow'}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Modal.Body>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default CanteenModal;
