import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdultsOnlyModal, DraftItemCard } from '../..';
import { useCallStore } from '../../../contexts/call.store';
import { isEmpty } from 'lodash';
import { CURRENCY } from '../../../constants/currency';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../../graphql/mutation/order';
import { IOrder } from '../../../types';
import { GET_ORDERS } from '../../../graphql/query';
import { useRouter } from 'next/router';
import { TYPE } from '../../../constants/constant';
import { CgSpinner } from 'react-icons/cg';

const Index = () => {
  const { t } = useTranslation('language');
  const router = useRouter();
  const { order, participant } = useCallStore();
  const [isAdultsOnly, setIsAdultOnly] = useState(false);

  const products = participant.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
  });

  const isDiningService = participant.services.includes(TYPE.DINIG) && participant.services.length === 1;

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

  const Continue = () => {
    if (isDiningService) {
      if (
        order?.items.some((item) =>
          products.some((product) => product.productId === item.productId && product.adultsOnly),
        )
      ) {
        setIsAdultOnly(true);
      } else {
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
      }
    } else {
      router.push(`/payment/order-process`);
    }
  };

  return (
    <>
      <div className="   bg-white h-full rounded-lg  w-full p-2 ">
        <span className="text-base text-misty ">{t('mainPage.MyOrder')}</span>
        <div className="grid content-between h-full bg-white ">
          <div className="h-full overflow-auto">
            <div className="w-full  mt-2 ">
              {order?.items.map((item) => (
                <DraftItemCard
                  item={item}
                  key={item.id}
                  image={products.find((product) => product.productId === item.productId)?.image}
                />
              ))}
            </div>
          </div>

          {!isEmpty(order?.items) && (
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-misty ">{t('mainPage.NewOrderAmount')}: </span>
                <span className="text-sm text-misty font-semibold">
                  {order?.totalAmount.toLocaleString()} {CURRENCY}
                </span>
              </div>

              <div className="border-b my-4"></div>
              <button
                disabled={loading}
                className={`w-full flex  justify-between  p-3 rounded-lg  ${
                  isEmpty(order?.items) ? 'bg-misty cursor-none ' : 'bg-current  cursor-pointer'
                } `}
                onClick={() => Continue()}
              >
                <div className="flex place-items-center">
                  {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
                  <span className="block  text-white font-semibold ">{t('mainPage.ToBeContinued')}</span>
                </div>

                <span className="block text-white font-semibold ">
                  {order?.totalAmount.toLocaleString()} {CURRENCY}
                </span>
              </button>
            </div>
          )}
        </div>

        {isAdultsOnly && (
          <AdultsOnlyModal
            loading={loading}
            visible={isAdultsOnly}
            onClose={() => setIsAdultOnly(false)}
            onConfirm={onComfirmAdultsOnly}
          />
        )}
      </div>
    </>
  );
};

export default Index;
