import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { Modal } from 'flowbite-react';
import { customThemeDraftModal } from '../../../styles/themes';
import { AdultsOnlyModal, DraftItemCard } from '..';
import { isEmpty } from 'lodash';
import { TYPE } from '../../constants/constant';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../graphql/mutation/order';
import { GET_ORDERS } from '../../graphql/query';
import { IOrder } from '../../types';
import { useRouter } from 'next/router';
import { CgSpinner } from 'react-icons/cg';

type Props = {
  visible: any;
  onClose: () => void;
};

const Index = ({ visible, onClose }: Props) => {
  const { t } = useTranslation('language');
  const router = useRouter();

  const { order, participant } = useCallStore();
  const [isAdultsOnly, setIsAdultOnly] = useState(false);

  const products = participant.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
  });

  const isDiningService =
    participant.services.length === 1 &&
    (participant.services.includes(TYPE.DINIG) || participant.services.includes(TYPE.TAKE_AWAY));

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
      router.push(`/payment?id=${data.createOrder.id}`);
    },
    onError(err) {},
  });

  const onComfirmAdultsOnly = () => {
    setIsAdultOnly(false);
    if (isEmpty(order?.items)) return;
    if (isDiningService) {
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
            type: TYPE.DINIG,
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
    } else {
      router.push(`/payment/order-process`);
    }
  };

  const Continue = () => {
    if (isEmpty(order?.items)) return;
    if (isDiningService) {
      if (
        order?.items.some((item) =>
          products.some((product) => product.productId === item.productId && product.adultsOnly),
        )
      ) {
        setIsAdultOnly(true);
      } else {
        let service = participant.services.find((service) => service === TYPE.DINIG || service === TYPE.TAKE_AWAY);
        debugger;
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
              type: service,
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
      }
    } else {
      router.push(`/payment/order-process`);
    }
  };

  return (
    <>
      <Modal theme={customThemeDraftModal} position="center" dismissible show={visible} onClose={() => onClose()}>
        <div>
          <Modal.Header>
            <span className="text-lg">{t('mainPage.MyOrder')}</span>
          </Modal.Header>
          <Modal.Body className="p-1">
            <div className="h-[70vh] overflow-auto">
              {order?.items.map((item) => (
                <DraftItemCard
                  item={item}
                  key={item.id}
                  image={products.find((product) => product.productId === item.productId)?.image}
                />
              ))}
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <button
            disabled={loading}
            className={`w-full flex  justify-between w-4/6 h-16 px-4 place-items-center rounded-lg  ${
              isEmpty(order?.items) ? 'bg-misty cursor-none ' : 'bg-current  cursor-pointer'
            } `}
            onClick={() => Continue()}
          >
            <div className="flex place-items-center">
              {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
              <span className="block  text-white text-lg font-semibold ">{t('mainPage.ToBeContinued')}</span>
            </div>

            <span className="block text-white text-lg font-semibold ">
              {order?.totalAmount.toLocaleString()} {CURRENCY}
            </span>
          </button>
        </Modal.Footer>
      </Modal>
      {isAdultsOnly && (
        <AdultsOnlyModal
          loading={loading}
          visible={isAdultsOnly}
          onClose={() => setIsAdultOnly(false)}
          onConfirm={onComfirmAdultsOnly}
        />
      )}
    </>
  );
};

export default Index;
