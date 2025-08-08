import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { TotalDescription } from '../..';
import { CURRENCY } from '../../../constants/currency';
import { IOrder } from '../../../types';
import { numberFormat } from '../../../utils';
import ExpandImg from '../../../assets/images/Expand.png';

type Props = {
  goBack: () => void;
  order: IOrder;
};

const Index = ({ goBack, order }: Props) => {
  const { t } = useTranslation('language');
  const [expanded, setExpanded] = useState(false);

  const onExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className=" fixed grid justify-items-center rounded-b-lg w-full top-0 z-10 bg-white py-2 md:py-4     ">
      <div className="container relative flex w-full place-items-center  mx-auto md:flex md:items-center">
        <div className="absolute">
          <BiArrowBack onClick={goBack} className="text-3xl  " />
        </div>
        <div className="flex w-full place-items-center place-content-center">
          <a className=" text-lg text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
            {t('mainPage.Payment')}
          </a>
        </div>
      </div>
      <div
        onClick={() => onExpand()}
        className=" w-full cursor-pointer grid sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12 "
      >
        <div className="border-b  my-1"></div>
        <span className="text-misty text-center text-lg mb-1 ">{t('mainPage.AmountPaid')}</span>
        <span className="text-misty font-semibold text-center text-xl  mb-1 ">
          {numberFormat.format(order?.grandTotal)} {CURRENCY}
        </span>
        {expanded && <TotalDescription order={order} />}
        <div className="flex place-content-center ">
          <img src={ExpandImg.src} />
        </div>
      </div>
    </div>
  );
};

export default Index;
