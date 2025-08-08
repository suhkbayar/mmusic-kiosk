import React from 'react';
import { ConvertIppos } from '../../../tools/convertImg';
import { useTranslation } from 'react-i18next';

type Props = {
  id: string;
  watch: any;
  onSelect: (type: string, id: string) => void;
};

const Index: React.FC<Props> = ({ id, watch, onSelect }) => {
  const paymentType = watch('paymentType');
  const { t } = useTranslation('language');

  if (!id) return null;

  return (
    <button
      type="submit"
      className=" inline-grid rounded-xl  place-self-center relative justify-items-center bg-macDonald w-56 p-12  shadow-lg  mt-4 "
    >
      <div onClick={() => onSelect('MBP', id)} className="rounded-lg flex place-self-center relative">
        <div className="text-center">
          <img className={`w-24 rounded-lg  text-white  mb-2`} src={ConvertIppos('GLP')} alt="Bank" />
          <span className="text-xl text-white  font-semibold">{t('mainPage.card')}</span>
        </div>
      </div>
    </button>
  );
};

export default Index;
