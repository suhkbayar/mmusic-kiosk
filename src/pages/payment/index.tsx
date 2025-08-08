import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useNotificationStore from '../../contexts/notificationStore';
import { useCallStore } from '../../contexts/call.store';
import { GET_ORDER } from '../../graphql/query';
import {
  BankFrom,
  ConfirmNewOrderModal,
  IpposForm,
  XasForm,
  XasModal,
  OrderInfo,
  PayCashierModal,
  QpayForm,
  WaitPaymentModal,
  MPostModal,
  MposForm,
  SuccessInfo,
} from '../../components';
import Loader from '../../components/Loader/Loader';
import { FieldValues, useForm } from 'react-hook-form';
import { CARD_PAYMENTS, PAYMENT_TYPE } from '../../constants/constant';
import { GET_PAY_ORDER, VALIDATE_TRANSACTION } from '../../graphql/mutation/order';
import { IOrder, ITransaction } from '../../types';
import { isEmpty } from 'lodash';
import QRCode from 'qrcode';
import { useReactToPrint } from 'react-to-print';
import OrderPrint from '../../components/Print/Order';
import CanteenModal from '../../components/Modal/CanteenModal';
import { useTranslation } from 'react-i18next';
import useIPPos from '../../hooks/useIPPos';
import PaymentFooter from '../../components/Button/PaymentFooter';
import ModalHeader from '../../layouts/Header/modalHeader';
import { CURRENCY } from '../../constants/currency';
import { moneyFormat } from '../../helpers/formatters';
import { emptyOrder } from '../../mock';

const filterBanks = ['QPay', 'UPT', 'Upoint', 'QPay2', 'GLP', 'XCP', 'MBP'];

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const printRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('language');
  const [visiblePending, setVisiblePending] = useState(false);
  const [visibleSucces, setVisibleSucces] = useState(false);
  const [visibleCashier, setVisibleCashier] = useState(false);
  const [visibleNewOrder, setVisibleNewOrder] = useState(false);
  const { participant, load, removeOrder, order: orderStore, config } = useCallStore();
  const [order, setOrder] = useState<IOrder>();
  const { showNotification, showAlert } = useNotificationStore();
  const [qrUrl, setQrUrl] = useState('');
  const [transaction, setTransaction] = useState<ITransaction>();
  const [visibleCanteen, setVisibleCanteen] = useState(false);
  const [visibleKhas, setVisibleKhas] = useState(false);
  const [visibleMpos, setVisibleMpos] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FieldValues>({
    mode: 'onSubmit',
  });

  register('paymentId', { required: true });
  register('paymentType', { required: true });

  const paymentType = watch('paymentType');
  const buyer = watch('buyer');
  const vatType = watch('vatType');
  const companyRegister = watch('register');

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    },
    onAfterPrint: () => {
      load(emptyOrder);
      // router.push(`/payment/success?id=${id}`);
      setIsSuccess(true);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onClickPrint = async (order: any) => {
    if (!order) return;
    var qrData = [{ data: isEmpty(order?.vatData) ? '' : order?.vatData, mode: 'numeric' }];
    try {
      await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'M' }).then((url) => {
        setQrUrl(url);
        console.log(url);
        setOrder(order);
      });
    } catch (err) {
      console.error(err);
    } finally {
      handlePrint();
    }
  };

  const onClose = () => {
    onClickPrint(order);
    setVisiblePending(false);
    reset({
      paymentId: null,
      paymentType: null,
    });
  };

  const { makePostPayment } = useIPPos({ onClose });

  const { loading, data } = useQuery(GET_ORDER, {
    skip: !id,
    variables: { id: id },
    onCompleted: (data) => {
      if (data?.getOrder.paymentState === 'PAID') {
        setVisiblePending(false);
        reset({
          paymentId: null,
          paymentType: null,
        });
        setVisibleCashier(false);
        if (!visibleCanteen) {
          setVisibleSucces(true);
        }
        if (!visibleSucces && !visibleCanteen) onClickPrint(data.getOrder);
      }
    },
    onError(err) {
      showNotification('warning', err.message);

      if (participant) {
        router.push(`/restaurant?id=${participant.id}`);
      }
    },
  });

  const [payCashier, { loading: cashierPaying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      setVisibleCashier(false);
      setVisibleSucces(true);
      onClickPrint(data?.payOrder?.order);
    },
    onError(err) {
      showAlert(true, 'error', err.message, t('mainPage.Error'));
    },
  });

  const [payOrderByPayment, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      if (data && data?.payOrder) {
        setTransaction(data.payOrder.transaction);
      }

      if (data?.payOrder?.transaction?.type === PAYMENT_TYPE.GLP) {
        makePostPayment(
          participant?.payments?.find((e) => e.type === PAYMENT_TYPE.GLP).id,
          data?.payOrder?.transaction,
        );
        return;
      }

      if (data?.payOrder?.transaction?.type === PAYMENT_TYPE.XCP) {
        setVisibleKhas(true);
        return;
      }
      if (data?.payOrder?.transaction?.type === PAYMENT_TYPE.MBP) {
        setVisibleMpos(true);
        return;
      }
      setVisiblePending(true);
    },
    onError(err) {
      showAlert(true, 'error', err.message, t('mainPage.Error'));
    },
  });

  const [validateTransaction, { loading: validating }] = useMutation(VALIDATE_TRANSACTION, {
    onCompleted(data) {
      if (data.validateTransaction.paymentState === 'PAID') {
        setVisibleCashier(false);
        setVisiblePending(false);
        reset({
          paymentId: null,
          paymentType: null,
        });
        setVisibleSucces(true);
        onClickPrint(data.validateTransaction);
      } else if (data.validateTransaction.paymentState !== 'PAID') {
        showAlert(true, 'warning', t('mainPage.NotPaidDescription'), t('mainPage.NotPaid2'));
      }
    },
    onError(err) {
      showAlert(true, 'error', err.message, t('mainPage.Error'));
    },
  });

  const onCashier = () => {
    if (cashierPaying) return;

    let input = {
      buyer: buyer,
      confirm: true,
      order: id,
      payment: '',
      register: companyRegister,
      vatType: vatType,
    };

    payCashier({
      variables: {
        input: { ...input },
      },
    });
  };

  const goBack = () => {
    router.push(`/restaurant?id=${participant.id}`);
  };

  if (!data) {
    return <Loader />;
  }

  if (!isMounted) return <Loader />;

  const onSubmit = (values: any) => {
    if (paying) return;
    if (CARD_PAYMENTS.includes(paymentType)) {
      setVisibleCanteen(true);
    } else if (paymentType === PAYMENT_TYPE.Cash) {
      onCashier();
    } else {
      let input = {
        buyer: orderStore.buyer,
        confirm: false,
        order: id,
        payment: values.paymentId,
        register: orderStore.register,
        vatType: participant.vat && typeof orderStore.vatType === 'number' ? orderStore.vatType : 0,
      };

      payOrderByPayment({
        variables: {
          input: { ...input },
        },
      });
    }
  };

  const onSelectBank = (type: any, id: string) => {
    setValue('paymentId', id);
    setValue('paymentType', type);
  };

  const onRefetch = async (transactionId: string) => {
    try {
      await validateTransaction({ variables: { id: transactionId } });
    } catch (error) {
      console.error('Error while refetching:', error);
      showAlert(true, 'warning', t('mainPage.NotPaidDescription'), t('mainPage.NotPaid2'));
    }
  };

  const waitPaymentOnClose = () => {
    setVisiblePending(false);
    reset({
      paymentId: null,
      paymentType: null,
    });
  };

  return (
    <>
      <div className="hidden">
        {order && !visibleCanteen && <OrderPrint key="orderPrint" ref={printRef} qrUrl={qrUrl} order={order} />}
      </div>

      {isSuccess ? (
        <SuccessInfo number={data?.getOrder?.number?.slice(-4)} />
      ) : (
        <>
          <ModalHeader />
          <div className="h-screen flex place-items-center">
            <div
              className={`overflow-auto login-body w-full py-20 pt-0 ${
                loading || paying || validating ? 'opacity-20' : ''
              }`}
            >
              <div className="w-full  flex place-content-center">
                <form onSubmit={handleSubmit(onSubmit)} className=" mt-5 w-10/12	 ">
                  <div className="px-4 mb-5  pt-4 gap-y-4">
                    <div className="grid w-full mt-4 ">
                      <div className="text-3xl font-bold text-misty text-center mb-4 ">
                        {t('mainPage.your_payment')}
                      </div>
                      <div className="grid items-center w-full place-content-center ">
                        <div className=" flex text-misty text-2xl font-semibold "></div>
                        <span className="text-macDonald  text-3xl font-bold text-center ">
                          {moneyFormat(data.getOrder?.grandTotal)} {CURRENCY}
                        </span>
                      </div>
                    </div>
                    <div className="mt-10">
                      <div className="text-2xl font-semibold text-misty text-center ">
                        {t('mainPage.SelectYourPaymentChannel')}
                      </div>
                    </div>
                    <div className="w-full bg-white rounded-lg p-2  mb-10 dark:bg-gray-800">
                      <div className="flex justify-center gap-2 ">
                        <BankFrom
                          banks={participant?.payments.filter((payment) => !filterBanks.includes(payment.type))}
                          watch={watch}
                          onSelect={onSelectBank}
                        />
                        <QpayForm
                          id={
                            participant?.payments.find(
                              (payment) => payment.type === PAYMENT_TYPE.QPay || payment.type === PAYMENT_TYPE.QPay2,
                            )?.id
                          }
                          watch={watch}
                          onSelect={onSelectBank}
                        />
                        <IpposForm
                          id={participant?.payments.find((payment) => payment.type === PAYMENT_TYPE.GLP)?.id}
                          watch={watch}
                          onSelect={onSelectBank}
                        />
                        <XasForm
                          id={participant?.payments.find((payment) => payment.type === PAYMENT_TYPE.XCP)?.id}
                          watch={watch}
                          onSelect={onSelectBank}
                        />

                        <MposForm
                          id={participant?.payments.find((payment) => payment.type === PAYMENT_TYPE.MBP)?.id}
                          watch={watch}
                          onSelect={onSelectBank}
                        />
                      </div>
                    </div>
                  </div>

                  {visibleCanteen && (
                    <CanteenModal
                      noPrint={config.noPrint}
                      ordered={data?.getOrder}
                      visibleCanteen={visibleCanteen}
                      payment={participant.payments.find((payment) => CARD_PAYMENTS.includes(payment.type))}
                      onClose={() => {
                        setVisibleCanteen(false);
                        goBack();
                      }}
                    />
                  )}
                  <OrderInfo order={data.getOrder} />
                  <PaymentFooter order={data.getOrder} newOrder={() => setVisibleNewOrder(true)} />
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {(loading || paying || validating) && (
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-[44%] left-1/2">
          <svg
            aria-hidden="true"
            className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-macDonald"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

      {visiblePending && (
        <WaitPaymentModal
          transaction={transaction}
          visible={visiblePending}
          onClose={() => waitPaymentOnClose()}
          refetch={onRefetch}
        />
      )}

      {visibleKhas && (
        <XasModal
          visible={visibleKhas}
          onClose={() => setVisibleKhas(false)}
          refetch={onRefetch}
          transaction={transaction}
        />
      )}

      {visibleMpos && (
        <MPostModal
          visible={visibleMpos}
          onClose={() => setVisibleMpos(false)}
          refetch={onRefetch}
          transaction={transaction}
        />
      )}

      {visibleNewOrder && <ConfirmNewOrderModal visible={visibleNewOrder} onClose={() => setVisibleNewOrder(false)} />}

      {visibleCashier && (
        <PayCashierModal onConfirm={onCashier} visible={visibleCashier} onClose={() => setVisibleCashier(false)} />
      )}
    </>
  );
};

export default Index;
