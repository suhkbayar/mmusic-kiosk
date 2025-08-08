import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PATTERN_PHONE } from '../../constants/pattern';

type FormData = {
  phone: string;
  email: string;
  name: string;
  comment: string;
};

type Props = {
  onSubmit: (formData: FormData) => void;
};

const Index = ({ onSubmit }: Props) => {
  const { t } = useTranslation('language');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <>
      <form className=" w-full grid  place-items-center  py-5 px-8" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal text-sm font-bold py-2 " htmlFor="password">
            {t('mainPage.EnterPhoneNumber')}
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            id="phone"
            type="text"
            {...register('phone', { required: true, pattern: PATTERN_PHONE })}
          />
          {errors.phone && <span className="text-xs pt-1 text-red-500 ">{t('mainPage.EnterPhoneNumber')}</span>}
        </div>

        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal text-sm font-bold py-2 " htmlFor="passwordRepeat">
            {t('mainPage.EnterName')}
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            id="name"
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-xs pt-1 text-red-500 ">{t('mainPage.PleaseEnterName')}</span>}
        </div>

        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal text-sm font-bold py-2 " htmlFor="passwordRepeat">
            {t('mainPage.WriteYourComments')}
          </label>
          <textarea
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            id="comment"
            rows={3}
            {...register('comment', { required: true })}
          />
          {errors.comment && <span className="text-xs pt-1 text-red-500 ">{t('mainPage.WriteYourComments')}</span>}
        </div>

        <div className="pt-4 pb-2  w-full ">
          <button
            type="submit"
            className="w-full   rounded-lg px-4 py-2  md: px-5 py-3 bg-current text-blue-100 hover:bg-current duration-300"
          >
            {t('mainPage.SendFeedback')}
          </button>
        </div>
      </form>
    </>
  );
};

export default Index;
