import React from 'react';
import { useTranslation } from 'react-i18next';
import { TfiClose } from 'react-icons/tfi';
type Props = {
  visible: boolean;
  onClose: () => void;
  values: any[];
  onSelectValue: (value: any) => void;
};

const Index = ({ visible, onClose, values, onSelectValue }: Props) => {
  const { t } = useTranslation('language');

  return (
    <>
      <div className={`fixed z-50 inset-0 flex items-center justify-center ${visible ? '' : 'hidden'}`}>
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <div className="align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xs sm:w-full">
          <div className="w-full flex items-end justify-end absolute ">
            <TfiClose className="text-end mx-2 my-2 text-xl" onClick={onClose} />
          </div>
          <div className="flex p-4 pb-3 place-content-center">
            <span className="text-gray-800 text-xl font-semibold ">{t('mainPage.Option')}</span>
          </div>
          <div className="grid w-full gap-2 p-4 pt-0 px-8 pb-8">
            {values.map((item) => (
              <div
                key={item}
                onClick={() => onSelectValue(item)}
                className="w-full bg-gray-200  text-2xl  cursor-pointer p-4  text-center hover:bg-gainsboro rounded-lg  justify-center  text-gray-700 "
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
