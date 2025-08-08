import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useCallStore } from '../../contexts/call.store';
import { useState, useEffect } from 'react';
import { SOUND_LINK, TYPE } from '../../constants/constant';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_ORDER } from '../../graphql/mutation/order';
import { GET_ORDERS } from '../../graphql/query';
import { GET_CROSS_SELLS } from '../../graphql/query/product';
import { IOrder } from '../../types/order';
import { isEmpty } from 'lodash';
import ModalHeader from '../../layouts/Header/modalHeader';
import { AdultsOnlyModal, DraftOrderItems, RecommendedCard, RecommendedSkelton } from '..';
import { CURRENCY } from '../../constants/currency';
import useSound from 'use-sound';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const DraftOrderModal = ({ visible, onClose }: Props) => {
  const { t } = useTranslation('language');
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const router = useRouter();
  const { order, participant, config, load } = useCallStore();
  const [isAdultsOnly, setIsAdultOnly] = useState(false);

  // Add cross-sell query
  const [getCrossSells, { data: cross, loading: aiLoading }] = useLazyQuery(GET_CROSS_SELLS);

  const products = participant.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
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
      load({ ...order, ...{ id: data.createOrder.id } });
      if (participant.vat) {
        router.push(`/payment/vat?id=${data.createOrder.id}`);
      } else {
        router.push(`/payment?id=${data.createOrder.id}`);
      }
    },
    onError(err) {},
  });

  // Add cross-sell effect
  useEffect(() => {
    if (visible && !isEmpty(order?.items)) {
      getCrossSells({
        variables: {
          menuId: participant.menu.id,
          ids: order?.items.map((item) => item.productId),
        },
      });
    }
  }, [visible, order?.items]);

  const onComfirmAdultsOnly = () => {
    setIsAdultOnly(false);
    if (isEmpty(order?.items)) return;
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
          type: order.type ?? TYPE.DINIG,
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

  const Continue = () => {
    if (!visible) return;

    if (isEmpty(order?.items)) return;
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
            type: order.type ?? TYPE.DINIG,
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
  };

  // Add cross-sell render function
  const renderRecommendations = (result: any[]) => {
    return (
      <div className="overflow-x-auto">
        <div className="flex space-x-1 ">
          {result?.map((product) => (
            <div key={product.id} className="min-w-[180px] rounded-2xl h-1/2 max-w-[250px]">
              <RecommendedCard
                isFullWidth
                product={product}
                orderItem={order?.items?.find((item) => item.productId === product.productId)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`wrap z-30  ${visible ? 'active' : ''}`}>
      <div className="content overflow-auto max-h-screen px-10 py-8">
        <ModalHeader />
        <div className="flex text-center w-full place-content-center mb-10">
          <span className="text-2xl text-gray-700 text-center font-semibold">{t('mainPage.MyOrder')}</span>
        </div>
        <div className="h-[55vh] overflow-auto">
          {order?.items.map((item) => (
            <DraftOrderItems
              item={item}
              key={item?.id}
              image={products.find((product) => product.productId === item?.productId)?.image}
            />
          ))}
        </div>

        {/* Add cross-sell section */}
        {!isEmpty(cross?.getCrossSells) && (
          <div className="mt-6">
            <div className="flex w-full px-4 py-2">
              <span className="text-gray-700 text-lg font-semibold">Санал болгох бүтээгдэхүүн</span>
            </div>
            <div className="flex justify-start">
              <div className="px-2 py-2 rounded-2xl rounded-bl-none text-gray-900 text-sm leading-relaxed break-words overflow-hidden">
                <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
                  {aiLoading ? <RecommendedSkelton /> : <>{renderRecommendations(cross?.getCrossSells)}</>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`w-full z-40 absolute  bottom-0 p-12 grid bg-white border-gray-100 shadow-lg border rounded-t-2xl  animate__animated ${
          visible ? 'animate__fadeIn' : 'animate__fadeOut'
        } `}
      >
        {visible && (
          <div className=" flex justify-between	 w-full">
            <div className="flex justify-start">
              <div
                className="bg-gray-200 font-bold  py-6 px-8 rounded-xl text-xl text-gray-500  "
                onClick={() => {
                  play();
                  onClose();
                }}
              >
                {t('mainPage.GoBack')}
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className={`py-6 px-8 font-bold flex gap-4 rounded-xl text-xl ${
                  !isEmpty(order?.items) ? 'bg-macDonald text-white button' : 'bg-gray-200 text-white button-variant'
                }`}
                onClick={() => {
                  play();
                  Continue();
                }}
              >
                <span>
                  {t('mainPage.ToBeContinued')} {order?.totalQuantity > 0 && <span>({order?.totalQuantity})</span>}
                </span>
                <span>
                  {order?.totalAmount.toLocaleString()} {CURRENCY}
                </span>
              </div>
            </div>
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
  );
};

export default DraftOrderModal;
