import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiTimeFive } from 'react-icons/bi';
import { checkIfOpen } from '../../tools/calcTimeTable';

type Props = {
  timeTable: any;
};

const daysOfWeek = [
  { day: 'Даваа', key: 'mon' },
  { day: 'Мягмар', key: 'tue' },
  { day: 'Лхагва', key: 'wed' },
  { day: 'Пүрэв', key: 'thu' },
  { day: 'Баасан', key: 'fri' },
  { day: 'Бямба', key: 'sat' },
  { day: 'Ням', key: 'sun' },
];

const Index = ({ timeTable }: Props) => {
  const { t } = useTranslation('language');
  return (
    <>
      <div className="p-4 w-full ">
        <div className="flex items-center place-content-between ">
          <div className="flex items-center">
            <BiTimeFive className="text-misty w-6 h-6 mr-1" />
            <p className="font-semibold text-misty">{t('mainPage.OpeningHours')}</p>
          </div>
          <div>{checkIfOpen(timeTable)}</div>
        </div>
        <div>
          <ul>
            {timeTable && (
              <>
                {daysOfWeek.map((day) => (
                  <li className="flex items-center place-content-between my-2" key={day.key}>
                    <h4 className="text-misty">{day.day}</h4>
                    {timeTable[day.key] ? (
                      <p className="text-sm text-gray1">
                        {timeTable[`${day.key}Open`]} - {timeTable[`${day.key}Close`]}
                      </p>
                    ) : (
                      <p>Closed</p>
                    )}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Index;
