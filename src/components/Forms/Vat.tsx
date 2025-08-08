import { useLazyQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERN_COMPANY_REGISTER, PATTERN_PERSONAL_REGISTER } from '../../constants/pattern';
import useNotificationStore from '../../contexts/notificationStore';
import { GET_VAT_PAYER } from '../../graphql/query/vat';
import { isEmpty } from 'lodash';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';
import useSound from 'use-sound';
import { SOUND_LINK, validPrefixes } from '../../constants/constant';
import Keyboard from 'react-simple-keyboard';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoAlertCircleOutline } from 'react-icons/io5';

type Props = {
  register: any;
  errors: any;
  setValue: any;
  reset: any;
};

const Index = ({ register, errors, setValue, reset }: Props) => {
  const { t } = useTranslation('language');
  const keyboard = useRef() as any;
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const [vatType, setVatType] = useState<string>('1');
  const [buyer, setBuyer] = useState<string>();
  const [buyerRegister, setBuyerRegister] = useState<string>();
  const [personRegister, setPersonRegister] = useState<string>();
  const { showAlert } = useNotificationStore();
  const [isCompany, setIsCompany] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(true);

  register('vatType', { required: true, value: vatType });
  register('register', {
    required: vatType === '3',
    value: isCompany ? buyerRegister : personRegister,
    patterm: isCompany ? PATTERN_COMPANY_REGISTER : PATTERN_PERSONAL_REGISTER,
  });
  register('buyer', { required: vatType === '3', value: buyer });

  const [getVatPayer, { loading }] = useLazyQuery(GET_VAT_PAYER, {
    onCompleted(data) {
      setBuyer(data.getVatPayer.name);
      setValue('buyer', data.getVatPayer.name);
      setError(false);
      if (!data.getVatPayer.found) {
        reset({
          buyer: null,
        });
        setBuyer(null);
      }
    },
    onError(err) {
      setError(true);
      showAlert(true, 'warning', t('mainPage.Error'), err.message);
    },
  });

  const onSelect = (vatValue: any) => {
    setVatType(vatValue);
    setValue('vatType', vatValue);
  };

  const onPersonRegister = (value: any) => {
    const isLetterPrefix = /^[\p{L}]{2}/u.test(value);
    const prefixOne = value.substring(0, 1).toUpperCase();
    const prefixTwo = value.substring(1, 2).toUpperCase();
    let isLetterOne = validPrefixes.includes(prefixOne);
    let isLetterTwo = validPrefixes.includes(prefixTwo);
    if (isLetterOne && !isLetterTwo) {
      setPersonRegister(value.toUpperCase());
    }

    if (!isLetterOne) {
      keyboard.current!.clearInput();
      return;
    }

    if (isLetterOne && isLetterTwo && value.length <= 10) {
      setPersonRegister(value.toUpperCase());
      if (isLetterPrefix && value.length === 10) {
        setValue('register', value);
        getVatPayer({ variables: { register: value } });
      } else {
        reset({
          buyer: null,
        });
        setBuyer(null);
        setError(true);
      }
    }
  };

  const onRegister = (value: any) => {
    if (value.length <= 7) {
      setBuyerRegister(value);
      if (value.length === 7) {
        setValue('register', value);
        getVatPayer({ variables: { register: value } });
      } else {
        reset({
          buyer: null,
        });
        setBuyer(null);
        setError(true);
      }
    }
  };

  const onInstitutionVatType = (boolean: boolean) => {
    play();
    setIsCompany(boolean);
    setPersonRegister('');
    setBuyerRegister('');
    reset({
      buyer: null,
    });
    keyboard.current!.clearInput();
    setBuyer(null);
  };

  const onKeyPress = (button: string) => {
    if (button === '{deleteall}') {
      setBuyerRegister('');
      reset({
        buyer: null,
      });
      setBuyer(null);
      keyboard.current!.clearInput();
    }
  };

  const onKeyPressPerson = (button: string) => {
    if (button === '{deleteall}') {
      setPersonRegister('');
      reset({
        buyer: null,
      });
      setBuyer(null);
      keyboard.current!.clearInput();
    }
    if (button === '{backspace}' && personRegister.length === 1) {
      setPersonRegister('');
      reset({
        buyer: null,
      });
      setBuyer(null);
      keyboard.current!.clearInput();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 ">
        <div className="text-2xl font-semibold text-misty text-center my-4 ">{t('mainPage.VATreceipt')}</div>
        <div className="flex gap-3 mt-2 justify-center ">
          <span
            className={`inline-grid  w-56 text-center text-xl font-semibold button justify-items-center	 p-12 rounded-xl   ${
              vatType === '1' ? 'bg-macDonald  text-white ' : 'bg-gainsboro text-misty '
            } `}
            onClick={() => {
              onSelect('1');
              play();
            }}
          >
            <FaRegUser className="text-[3rem] mb-2" />
            <span>{t('mainPage.Individual')}</span>
          </span>
          <span
            onClick={() => {
              onSelect('3');
              play();
            }}
            className={`inline-grid w-56 text-center text-xl font-semibold button justify-items-center	 p-12   rounded-xl   ${
              vatType === '3' ? 'bg-macDonald  text-white ' : 'bg-gainsboro text-misty '
            } `}
          >
            <HiOutlineBuildingLibrary className="text-[3rem] mb-2" />
            <span>{t('mainPage.Institution')}</span>
          </span>
        </div>
        {vatType === '3' && (
          <>
            <div className="text-2xl font-semibold text-misty text-center my-4 ">{t('mainPage.taxpayer_type')}</div>
            <div className="flex w-full items-center justify-center    ">
              <div className="flex gap-3  justify-center bg-gainsboro p-2 rounded-2xl ">
                <span
                  className={`inline-grid   w-56   text-center text-lg font-semibold button justify-items-center	 p-2 rounded-xl   ${
                    isCompany ? 'bg-macDonald  text-white ' : 'bg-gainsboro text-misty '
                  } `}
                  onClick={() => {
                    onInstitutionVatType(true);
                  }}
                >
                  <span>{t('mainPage.Institution')}</span>
                </span>
                <span
                  onClick={() => {
                    onInstitutionVatType(false);
                  }}
                  className={`inline-grid  w-56  text-center text-lg font-semibold button justify-items-center	 p-2   rounded-xl   ${
                    !isCompany ? 'bg-macDonald  text-white ' : 'bg-gainsboro text-misty '
                  } `}
                >
                  <span>{t('mainPage.citizen')}</span>
                </span>
              </div>
            </div>
          </>
        )}

        {vatType === '3' && (
          <>
            <div className="grid w-full items-center justify-center ">
              <div
                className={` grid w-[30rem] gap-4 items-center justify-center  bg-gainsboro p-4  rounded-xl   mt-4  ${
                  loading ? 'opacity-20' : ''
                } `}
              >
                <div className="inline-grid  w-[28rem]      ">
                  {isCompany ? (
                    <div className="relative w-full">
                      <input
                        value={buyerRegister}
                        disabled={loading}
                        autoFocus
                        placeholder={t('mainPage.enter_registration_number')}
                        onChange={(e) => onRegister(e.target.value)}
                        className="px-4 py-2 text-gray-800 h-14 text-xl w-full transition duration-300 border border-transparent shadow-sm rounded-xl focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300  "
                        type="text"
                      />
                      {!isEmpty(buyerRegister) && (
                        <>
                          {isError ? (
                            <IoAlertCircleOutline className="absolute right-[18px] top-[16px] text-2xl text-red-800" />
                          ) : (
                            <IoCheckmarkCircleOutline className="absolute right-[18px] top-[16px] text-2xl text-success" />
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <input
                        autoFocus
                        value={personRegister}
                        disabled={loading}
                        placeholder={t('mainPage.enter_registration_number')}
                        onChange={(e) => onPersonRegister(e.target.value)}
                        className="px-4 py-2 w-full text-gray-800 h-14 text-xl transition duration-300 border border-transparent shadow-sm rounded-xl focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300  "
                        type="text"
                      />
                      {!isEmpty(personRegister) && (
                        <>
                          {isError ? (
                            <IoAlertCircleOutline className="absolute right-[18px] top-[16px] text-2xl text-red-800" />
                          ) : (
                            <IoCheckmarkCircleOutline className="absolute right-[18px] top-[16px] text-2xl text-success" />
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {errors.register && <span className="text-xs pt-1 text-red-500 ">{errors.register.message}</span>}
                </div>

                {!isEmpty(buyer) && (
                  <div className="inline-grid w-[28rem]      ">
                    <input
                      className="px-4 py-2 text-gray-800 h-14 text-xl transition duration-300 border border-transparent shadow-sm rounded-xl focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300  "
                      type="text"
                      disabled
                      value={isEmpty(buyer) ? '' : buyer}
                      {...register('buyer', { required: true })}
                    />
                    {errors.buyer && (
                      <span className="text-xs pt-1 text-red-500 ">
                        {isCompany ? 'Байгууллагын нэр буруу байна!' : 'Нэр буруу байна!'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {loading && (
                <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-[44%] left-1/2">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-current"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
              <div className="mt-4">
                {isCompany ? (
                  <Keyboard
                    key={1}
                    keyboardRef={(r) => (keyboard.current = r)}
                    input={buyerRegister}
                    onChange={onRegister}
                    onKeyPress={onKeyPress}
                    layout={{
                      default: ['1 2 3', '4 5 6', '7 8 9', '{deleteall} 0 {bksp}'],
                      shift: ['! / #', '$ % ^', '& * (', '{deleteall} ) +', '{bksp}'],
                    }}
                    theme="hg-theme-default hg-layout-numeric numeric-theme myTheme"
                    display={{
                      '{deleteall}': 'C',
                      '{space}': 'Space',
                      '{bksp}': '⌫',
                    }}
                  />
                ) : (
                  <Keyboard
                    key={2}
                    input={personRegister}
                    keyboardRef={(r) => (keyboard.current = r)}
                    onChange={onPersonRegister}
                    onKeyPress={onKeyPressPerson}
                    layout={{
                      default: [
                        '1 2 3 4 5 6 7 8 9 0',
                        'А Б В Г Д Е Ё Ж З И Й К',
                        'Л М Н О Ө Р С Т У Ү Ф Х',
                        'Ц Ч Ш Ъ Ы Ь Э Ю Я',
                        '{deleteall} {backspace}',
                      ],
                    }}
                    display={{
                      '{deleteall}': 'Арилгах',
                      '{backspace}': '⌫',
                    }}
                    theme="hg-theme-default hg-layout-numeric numeric-theme"
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
