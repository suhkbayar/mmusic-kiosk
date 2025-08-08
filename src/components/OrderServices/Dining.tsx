import React from 'react';
import { useTranslation } from 'react-i18next';
import check from '../../assets/images/Check.png';
import unCheck from '../../assets/images/unCheck.png';
import dining from './images/dinnig.svg';

type Props = {
  active: boolean;
  onSelect: (value: any) => void;
  service: string;
};

const Index = ({ onSelect, active, service }: Props) => {
  const { t } = useTranslation('language');

  return (
    <div key={service} className="w-full" onClick={() => onSelect(service)}>
      <div className="border-b  my-2"></div>
      <div className="w-full flex place-items-center place-content-between">
        <div className="flex place-items-center gap-2">
          <img src={dining.src} />
          <span className="text-sm text-misty ">{t('mainPage.Dining')}</span>
        </div>
        <img src={active ? check.src : unCheck.src} />
      </div>
    </div>
  );
};

export default Index;
