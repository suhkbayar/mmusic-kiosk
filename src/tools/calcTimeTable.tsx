export const checkIfOpen = (props: any) => {
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const currentDay = new Date().getDay();
  const currentWeekday = weekdays[currentDay];

  const openingHours = weekdays.map((day) => ({
    day,
    open: props[`${day}Open`],
    close: props[`${day}Close`],
  }));

  openingHours.sort((a, b) => weekdays.indexOf(a.day) - weekdays.indexOf(b.day));

  function checkIfOpen(open: string, close: string) {
    const currentTime = new Date();
    const formattedTime = currentTime.getHours().toString().padStart(2, '0');
    if (formattedTime >= open.slice(0, 2) && formattedTime < close.slice(0, 2)) {
      return true;
    }
    return false;
  }

  const currentOpeningHours = openingHours.find((hours) => hours.day === currentWeekday);

  if (currentOpeningHours && currentOpeningHours.open && currentOpeningHours.close) {
    const isOpen = checkIfOpen(currentOpeningHours.open, currentOpeningHours.close);
    if (isOpen) {
      return <span style={{ color: '#F26333' }}>Нээлттэй</span>;
    } else {
      return <span style={{ color: '#F26333' }}>Хаалттай</span>;
    }
  }

  return null;
};

export const timeAgo = (props: any) => {
  const currentTime = new Date().getTime();
  const givenTime = new Date(props).getTime();
  const difference = currentTime - givenTime;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} Өдрийн өмнө`;
  } else if (hours > 0) {
    return `${hours} Цагийн өмнө`;
  } else if (minutes > 0) {
    return `${minutes} Минутийн өмнө`;
  } else {
    return `${seconds} Секунтийн өмнө `;
  }
};

export function isOpenNow(config: any): boolean {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLocaleLowerCase().substr(0, 3);
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

  if (!config) {
    return true;
  }

  const isOpenToday = config[currentDay];
  if (!isOpenToday) {
    return false;
  }

  const openingTime = config[`${currentDay}Open`];
  const closingTime = config[`${currentDay}Close`];

  if (openingTime === null || closingTime === null) {
    return false; // Opening or closing time is not specified
  }

  return currentTime >= openingTime && currentTime <= closingTime;
}
