import React, { useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { RiContactsBookLine } from 'react-icons/ri';

type Props = {
  address: any;
  email: any;
  phone: any;
};

const Index = ({ address, email, phone }: Props) => {
  const { t } = useTranslation('language');

  return (
    <div className="w-full p-4 ">
      <div className="flex items-center mb-4 ">
        <RiContactsBookLine className="text-misty w-6 h-6 mr-1" />
        <p className="font-semibold text-misty ">{t('mainPage.ContactInformation')}</p>
      </div>

      {address && (
        <>
          <div className="flex items-center place-content-between">
            <p className="text-misty">{address}</p>
            <GoLocation className="w-6 h-6  text-current" />
          </div>
          <div className="border-b my-4"></div>
        </>
      )}
      {email && (
        <>
          <div className="flex items-center place-content-between">
            <p className="text-misty">{email}</p>
            <HiOutlineMail className="w-6 h-6  text-current" />
          </div>
          <div className="border-b my-4"></div>
        </>
      )}
      {phone && (
        <>
          <div className="flex items-center place-content-between">
            <p className="text-misty">{phone}</p>
            <AiOutlinePhone className="w-6 h-6  text-current" />
          </div>
          <div className="border-b my-4"></div>
        </>
      )}
    </div>
  );
};

export default Index;
