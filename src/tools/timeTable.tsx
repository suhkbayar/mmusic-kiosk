export const getOpenOrClosedBranches = (nowDate: string, result: any[], open: boolean) => {
  if (open) {
    switch (nowDate) {
      case 'Sunday':
        return result.filter((arr) => arr.timetable?.sun);
      case 'Monday':
        return result.filter((arr) => arr.timetable?.mon);
      case 'Tuesday':
        return result.filter((arr) => arr.timetable?.tue);
      case 'Wednesday':
        return result.filter((arr) => arr.timetable?.wed);
      case 'Thursday':
        return result.filter((arr) => arr.timetable?.thu);
      case 'Friday':
        return result.filter((arr) => arr.timetable?.fri);
      case 'Saturday':
        return result.filter((arr) => arr.timetable?.sat);
      default:
        return result;
    }
  } else {
    switch (nowDate) {
      case 'Sunday':
        return result.filter((arr) => !arr.timetable?.sun);
      case 'Monday':
        return result.filter((arr) => !arr.timetable?.mon);
      case 'Tuesday':
        return result.filter((arr) => !arr.timetable?.tue);
      case 'Wednesday':
        return result.filter((arr) => !arr.timetable?.wed);
      case 'Thursday':
        return result.filter((arr) => !arr.timetable?.thu);
      case 'Friday':
        return result.filter((arr) => !arr.timetable?.fri);
      case 'Saturday':
        return result.filter((arr) => !arr.timetable?.sat);
      default:
        return result;
    }
  }
};
