import React from 'react';
import { IBranch } from '../../types';
import { useTranslation } from 'react-i18next';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  branch: IBranch;
};

const Index = ({ branch }: Props) => {
  const { t } = useTranslation('language');
  return (
    <>
      <div className="w-full p-4">
        {branch.type === 'Other' ? (
          <p className="text-xl font-semibold text-misty">
            {t('mainPage.ReadMore')} {t('mainPage.OtherInformation').toLowerCase()}
          </p>
        ) : (
          <div className="flex items-center">
            <AiOutlineInfoCircle className="text-misty w-6 h-6 mr-1" />
            <p className="font-semibold text-misty ">{t('mainPage.aboutRestaurant')}</p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="m-0 text-grayish text-sm p-4 ">{branch.description}</div>
          {branch.images.map((image, index) => (
            <div className="scroll-images" key={index}>
              <img className="w-72" src={image} key={index} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
