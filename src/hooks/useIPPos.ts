import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ORDERS, GET_PAYMENT } from '../graphql/query';
import { IOrder, ITransaction } from '../types';
import { VALIDATE_TRANSACTION } from '../graphql/mutation/order';
import useNotificationStore from '../contexts/notificationStore';

interface Props {
  onClose: () => void;
}

const useIPPos = (props: Props) => {
  const { onClose } = props;
  const { showNotification } = useNotificationStore();

  const makePostPayment = (id: string, transaction: ITransaction) => {
    getPayment({
      fetchPolicy: 'network-only',
      variables: { id },
      onCompleted(data) {
        getGlp(transaction, data?.getPayment);
      },
    });
  };

  const [getPayment] = useLazyQuery(GET_PAYMENT);

  const [validateTransaction] = useMutation(VALIDATE_TRANSACTION, {
    onCompleted(data) {
      onClose();
    },
    onError(err) {
      onClose();
      showNotification('error', err.message);
    },
  });

  const getGlp = async (transaction, channel) => {
    const transactionAmount = parseFloat(transaction.amount) * 100;

    const requestJson = {
      requestID: transaction.id,
      portNo: channel.invoiceCode,
      timeout: '540000',
      terminalID: channel.merchantCode,
      amount: `${transactionAmount}`,
      currencyCode: '496',
      operationCode: '1',
      bandWidth: '115200',
      cMode: '',
      cMode2: '',
      additionalData: '',
      cardEntryMode: '',
      fileData: '',
    };

    const base64String = Buffer.from(JSON.stringify(requestJson)).toString('base64');

    const url = `http://localhost:8500/requestToPos/message?data=${base64String}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        showNotification('error', 'Амжилтгүй');

        onClose();
      }
      const data = await response.json();
      const { responseCode, responseDesc } = await JSON.parse(data.PosResult);
      if (responseCode === '00') {
        validateTransaction({
          variables: { id: transaction.id },

          update(cache, { data: { validateTransaction } }) {
            const caches = cache.readQuery<{ getOrders: IOrder[] }>({ query: GET_ORDERS });
            if (caches && caches.getOrders) {
              cache.writeQuery({
                query: GET_ORDERS,
                data: {
                  setVatType: caches.getOrders.map((order) => {
                    if (validateTransaction.id === order.id) return validateTransaction;
                    return order;
                  }),
                },
              });
            }
          },
        });
      } else {
        showNotification('error', responseDesc);

        onClose();
      }
      // "00" responseCode
      //  "SUCCESS"  responseDesc
      // process the reply from the server
    } catch (error) {
      showNotification('error', 'Амжилтгүй');

      onClose();
    }
  };
  return { makePostPayment };
};

export default useIPPos;
