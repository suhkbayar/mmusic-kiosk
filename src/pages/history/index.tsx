import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { OrderHistory } from '../../components';
import Loader from '../../components/Loader/Loader';
import { useCallStore } from '../../contexts/call.store';
import { GET_ORDERS } from '../../graphql/query';

const Index = () => {
  const router = useRouter();
  const { participant } = useCallStore();
  const { t } = useTranslation('language');

  const { loading, error, data } = useQuery(GET_ORDERS, {
    onError(error) {
      router.push(`restaurant?id=${participant.id}`);
    },
  });

  const goBack = () => {
    router.back();
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="relative shadow-lg top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={goBack} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.OrderHistory')}
            </a>
          </div>
        </div>
      </div>
      <OrderHistory />
    </>
  );
};

export default Index;
