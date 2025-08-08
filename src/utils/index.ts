import { isEmpty } from 'lodash';
import moment from 'moment';

export const numberFormat = new Intl.NumberFormat();
export const optionsCalc = (options: any) => {
  if (isEmpty(options)) {
    return [];
  } else {
    return options
      .map((option: any) => option.price)
      .reduce((acc: any, a: any) => {
        return acc + a;
      }, 0);
  }
};

export const parseConfig = (value: string): any | null => {
  try {
    return value === undefined ? null : JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const isCurrentlyOpen = (timetable?: any): boolean => {
  // If no timetable exists, consider it always open
  if (!timetable) return true;

  const now = moment();
  const day = now.format('ddd').toLowerCase(); // mon, tue, etc.
  const yesterdayDay = moment().subtract(1, 'day').format('ddd').toLowerCase();

  // Check current day settings
  const isDayActive = timetable?.[day];
  const openTime = timetable?.[`${day}Open`];
  const closeTime = timetable?.[`${day}Close`];

  // Check previous day settings (for overnight shifts)
  const wasYesterdayActive = timetable?.[yesterdayDay];
  const yesterdayOpenTime = timetable?.[`${yesterdayDay}Open`];
  const yesterdayCloseTime = timetable?.[`${yesterdayDay}Close`];

  // If current day has no settings, consider it open
  if (!isDayActive || !openTime || !closeTime) return true;

  // Current day check - standard case (opening and closing on same day)
  const todayStr = now.format('YYYY-MM-DD');
  const todayOpenMoment = moment(`${todayStr} ${openTime}`, 'YYYY-MM-DD HH:mm');
  const todayCloseMoment = moment(`${todayStr} ${closeTime}`, 'YYYY-MM-DD HH:mm');

  // If closing time is after opening time (normal hours), check if current time is in between
  if (todayCloseMoment.isAfter(todayOpenMoment)) {
    if (now.isBetween(todayOpenMoment, todayCloseMoment, null, '[]')) {
      return true;
    }
  }

  // Overnight shift case for current day
  if (todayCloseMoment.isBefore(todayOpenMoment)) {
    const tomorrowStr = moment().add(1, 'day').format('YYYY-MM-DD');
    const adjustedCloseTime = moment(`${tomorrowStr} ${closeTime}`, 'YYYY-MM-DD HH:mm');

    if (now.isBetween(todayOpenMoment, adjustedCloseTime, null, '[]')) {
      return true;
    }
  }

  // Check if we're in yesterday's overnight shift
  if (wasYesterdayActive && yesterdayOpenTime && yesterdayCloseTime) {
    const yesterdayStr = moment().subtract(1, 'day').format('YYYY-MM-DD');
    const yesterdayOpenMoment = moment(`${yesterdayStr} ${yesterdayOpenTime}`, 'YYYY-MM-DD HH:mm');
    let yesterdayCloseMoment = moment(`${yesterdayStr} ${yesterdayCloseTime}`, 'YYYY-MM-DD HH:mm');

    // If yesterday had an overnight shift
    if (yesterdayCloseMoment.isBefore(yesterdayOpenMoment)) {
      yesterdayCloseMoment = moment(`${todayStr} ${yesterdayCloseTime}`, 'YYYY-MM-DD HH:mm');

      if (now.isBetween(yesterdayOpenMoment, yesterdayCloseMoment, null, '[]')) {
        return true;
      }
    }
  }

  return false;
};
