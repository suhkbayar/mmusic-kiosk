import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useCallStore } from '../../../contexts/call.store';
import { BiArrowBack } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Dining, PreOrder, Delivery, TakeAway, PreOrderForm, DeliveryForm, TakeAwayForm } from '../../../components';
import { CURRENCY } from '../../../constants/currency';
import ExpandImg from '../../../assets/images/Expand.png';
import { CreateOrderInput, DeliveryField, PreOrderField, TakeAwayField } from '../../../mock';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../../graphql/mutation/order';
import { IOrder } from '../../../types';
import { GET_ORDERS } from '../../../graphql/query';
import { CgSpinner } from 'react-icons/cg';
import { TYPE } from '../../../constants/constant';

type FormData = {
  deliveryDate: string;
};

const Index = () => {
  const router = useRouter();
  const { participant, order } = useCallStore();
  const { t } = useTranslation('language');
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();

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

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 0);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  const onSelect = (service: string) => {
    setSelectedService(service);
    reset({
      deliveryDate: 'ASAP',
    });
  };

  const getDeliveryDate = (data: any) => {
    return data.selectDate + '/' + data.deliveryTime;
  };

  const onSubmit = (data: any) => {
    const emptyObject = {
      deliveryDate: '',
      contact: '',
      address: '',
      name: '',
      comment: '',
      guests: 1,
    };

    let foundValues: CreateOrderInput = emptyObject;

    const items = order?.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      comment: item.comment,
      options: item.options.map((option) => ({
        id: option.id,
        value: option.value,
      })),
    }));

    const fields = {
      Dining: null,
      PreOrder: PreOrderField,
      Delivery: DeliveryField,
      TakeAway: null,
    };

    if (selectedService === TYPE.PRE_ORDER) {
      foundValues.deliveryDate = getDeliveryDate(data);
    }

    fields[selectedService]?.forEach((field) => {
      foundValues[field] = data[field];
    });

    createOrder({
      variables: {
        participant: participant.id,
        input: {
          type: selectedService,
          items: items,
          ...foundValues,
        },
      },
    });
  };
  const onExpant = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (participant?.services?.length > 0) {
      setSelectedService(participant.services[0]);
    }
  }, [participant]);

  const goBack = () => {
    router.push(`/restaurant?id=${participant.id}`);
  };

  const formComponents = {
    PreOrder: PreOrderForm,
    Delivery: DeliveryForm,
    // TakeAway: TakeAwayForm,
  };
  const ComponentForms = formComponents[selectedService];

  return (
    <>
      {showContent && (
        <div className="h-screen flex place-items-center">
          <div className=" fixed w-full top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
            <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
              <div>
                <BiArrowBack onClick={goBack} className="text-xl dark:text-white " />
              </div>
              <div className="flex w-full place-items-center place-content-center">
                <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                  {t('mainPage.TermsOfOrder')}
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-auto login-body w-full  ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full    flex place-content-center">
              <div className="  w-full sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12 ">
                <div className="bg-white rounded-lg p-6 pt-2 pb-4   mt-10  ">
                  <label className="text-gray-700 font-normal text-base  font-bold py-2 dark:text-white  " htmlFor="">
                    {t('mainPage.OrderType')}
                  </label>
                  {selectedService &&
                    participant?.services.map((service) => {
                      const serviceComponents = {
                        Dining,
                        PreOrder,
                        Delivery,
                        TakeAway,
                      };
                      const Component = serviceComponents[service];
                      return Component ? (
                        <Component
                          key={service}
                          active={selectedService === service}
                          onSelect={onSelect}
                          service={service}
                        />
                      ) : null;
                    })}
                </div>
                {ComponentForms ? (
                  <>
                    <div className="bg-white rounded-lg p-6 pt-2 pb-12 mb-5 mt-5  ">
                      <ComponentForms register={register} errors={errors} setValue={setValue} />
                    </div>
                    <br />
                    <br />
                    <br />
                  </>
                ) : null}
              </div>
              <div className=" fixed cursor-pointer bottom-0 sm:bottom-0 transition-all duration-500  md:bottom-5 lg:bottom-5 w-full   sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12">
                <div className="bg-white pl-4 pr-4 pt-7 pb-2 rounded-t-lg">
                  <div
                    onClick={() => onExpant()}
                    className=" absolute top-2.5 w-full flex right-0 place-content-center "
                  >
                    <img src={ExpandImg.src} />
                  </div>
                  {expanded ? (
                    <div onClick={() => onExpant()}>
                      <span className="text-sm text-misty font-semibold">{t('mainPage.OrderSummary')}</span>
                      <div className="border-b  my-2"></div>
                      {order?.items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 mb-2 place-content-between text-sm text-misty place-items-center"
                        >
                          <span className="w-full">{item.name}</span>
                          <span className="px-2 py-1 rounded-lg bg-iceBlue text-xs">x{item.quantity}</span>
                          <span className="text-xs w-full text-end">
                            {item.price} {CURRENCY}
                          </span>
                        </div>
                      ))}
                      <div className="border-b  my-2"></div>
                      <div className="flex place-content-between mb-4">
                        <div className="text-sm text-misty font-semibold">{t('mainPage.Total')}</div>

                        <div className="text-sm text-misty font-semibold">
                          {order?.totalAmount} {CURRENCY}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => onExpant()}
                      className="w-full mb-3 flex place-content-between place-items-center rounded-lg px-4 py-3 bg-iceBlue"
                    >
                      <span className="text-misty">{t('mainPage.Products')}</span>
                      <span className="p-1 rounded-lg text-sm bg-gainsboro font-semibold text-misty">
                        {order?.totalQuantity !== null && order?.totalQuantity !== undefined
                          ? `${order?.totalQuantity} ш`
                          : 'N/A'}
                      </span>
                    </div>
                  )}

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full flex place-content-between place-items-center rounded-lg px-4 py-3   bg-current text-white hover:bg-current duration-300"
                  >
                    {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
                    <span>{t('mainPage.ToBeContinued')}</span>
                    <span className="p-1 rounded-lg text-sm bg-coral font-semibold text-white">
                      {order?.totalAmount} {CURRENCY}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
