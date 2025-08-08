import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERN_PHONE } from '../../constants/pattern';
import { useCallStore } from '../../contexts/call.store';
import { convertDays } from '../../mock';

type Props = {
  register: any;
  errors: any;
  setValue: any;
};

interface KeyValuePair {
  key: string;
  value: string;
}

const Index = ({ register, errors, setValue }: Props) => {
  const { t } = useTranslation('language');

  const { user, participant } = useCallStore();
  const [deliveryDate, setDeliveryDate] = useState('ASAP');

  register('deliveryDate', { required: true, value: deliveryDate });

  const calculateDayStatus = (day: any) => {
    const dayKey = convertDays.find((d) => d[day])?.key;

    if (!dayKey) {
      throw new Error('Invalid day');
    }

    return {
      isOpen: participant?.branch.timetable[dayKey],
    };
  };

  const calculateNextSevenDaysStatus = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const nextSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const index = (today + i) % 7;
      const day = days[index];
      const { isOpen } = calculateDayStatus(day);
      if (isOpen) {
        nextSevenDays.push({ day });
      }
    }

    return nextSevenDays;
  };

  const days = calculateNextSevenDaysStatus();

  const calculateClosedTime = (day: any) => {
    const dayKey = convertDays.find((d) => d[day])?.close;

    if (!dayKey) {
      throw new Error('Invalid day');
    }

    let closedTime = participant?.branch.timetable[dayKey];
    return closedTime || '';
  };

  const [selectDate, setSelectDate] = useState(days[0]?.day);
  const [times, setTimes] = useState<KeyValuePair[]>([]);

  useEffect(() => {
    if (selectDate) {
      const updatedTimes = getTimes();
      setTimes(updatedTimes);
    }
  }, [selectDate]);

  const getTimes = () => {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    const times: KeyValuePair[] = [];

    const closedTime = calculateClosedTime(selectDate);

    if (!closedTime) {
      return times;
    }

    const [closedHour, closedMinute] = closedTime.split(':').map(Number);

    for (let i = h; i <= closedHour; i++) {
      if (i === h && m <= 15) {
        times.push({ key: i + ':30', value: i + ':30' });
      } else if (i === closedHour && closedMinute <= 15) {
        break;
      } else {
        times.push({ key: i + ':00', value: i + ':00' });
        if (i !== closedHour) {
          times.push({ key: i + ':30', value: i + ':30' });
        }
      }
    }

    if (closedMinute === 0 || closedMinute >= 30) {
      times.push({ key: closedHour + ':00', value: closedHour + ':00' });
    } else {
      times.push({ key: closedHour + ':30', value: closedHour + ':30' });
    }

    return times;
  };

  const onAsap = () => {
    setDeliveryDate('ASAP');
    setValue('deliveryDate', 'ASAP');
  };

  const onSelectTime = (e) => {
    setDeliveryDate(e.target.value);
    setValue('deliveryDate', e.target.value);
  };

  return (
    <>
      <div className="text-gray-700 font-normal text-base  font-bold my-4   ">{t('mainPage.CustomerInformation')}</div>
      <div className="inline-grid w-full ">
        <label className="text-gray-700 font-normal text-sm  text-misty font-bold py-2 " htmlFor="">
          {t('mainPage.PhoneNumber')}
        </label>
        <input
          className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
          inputMode="numeric"
          type="text"
          {...register('contact', { required: true, pattern: PATTERN_PHONE, value: user && user.phone })}
        />
        {errors.phone && <span className="text-xs pt-1 text-red-500 ">{t('mainPage.PleaseEnterPhoneNumber')}</span>}
      </div>

      <div className="inline-grid w-full ">
        <label className="text-gray-700 font-normal text-sm  text-misty font-bold py-2 " htmlFor="">
          {t('mainPage.username')}
        </label>
        <input
          className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
          type="text"
          {...register('name', { required: true, value: user && user.firstName })}
        />
        {errors.name && <span className="text-xs pt-1 text-red-500 ">{t('mainPage.PleaseEnterName')}</span>}
      </div>
      <div className="text-gray-700 font-normal text-base  font-bold my-4    ">{t('mainPage.TakeAway')}</div>
      <div className="flex gap-3">
        <div className="inline-grid w-full  ">
          <span
            onClick={onAsap}
            className={` flex cursor-pointer place-items-center place-content-center transition duration-300 border  ${
              deliveryDate === 'ASAP' ? 'border-current bg-lightapricot text-current' : 'border-gray-300 text-gray1'
            } rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300`}
          >
            {t('mainPage.ASAP')}
          </span>
        </div>
        <div className="inline-grid w-full ">
          <select
            onChange={onSelectTime}
            className={`px-4 py-2  transition duration-300 border 
            ${deliveryDate !== 'ASAP' ? 'border-current bg-lightapricot text-current' : ' border-gray-300 text-gray1'}
            rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300`}
          >
            {times?.map((value, i) => (
              <option key={i} value={value.key}>
                {value.value}
              </option>
            ))}
          </select>
          {errors.name && <span className="text-xs pt-1 text-red-500 ">{t('mainPage.PleaseEnterName')}</span>}
        </div>
      </div>
    </>
  );
};

export default Index;
