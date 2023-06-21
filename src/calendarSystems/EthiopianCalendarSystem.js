/**
 * Ethiopian Calendar System
 *
 * @file EthiopianCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

export default class EthiopianCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 0; // Sunday
    this.locale = locale;
    // Julian date of start of Ethiopian epoch: 27 August 8 CE (Gregorian).
    this.julianDayEpoch = 1724220.5;
    this.intlCalendar = "ethiopic";
    this.firstMonthNameEnglish = "Meskerem";
    this.monthNamesLocalized = generateMonthNames(
      locale,
      "ethiopic",
      "Meskerem"
    );
  }

  convertFromJulian(julianDayNumber) {
     // Calculate the number of days since the Ethiopian epoch
     const days = Math.floor(julianDayNumber) + 0.5 - this.julianDayEpoch;
     // Calculate the Ethiopian year
     const year = Math.floor((days - Math.floor((days + 366) / 1461)) / 365) + 1;
     // Calculate the day of the year (1-366)
     const dayOfYear = days - (year - 1) * 365 - Math.floor((year - 1) / 4);
     // Calculate the Ethiopian month (1-13)
     const month = dayOfYear > 330 ? 13 : Math.floor((dayOfYear - 1) / 30) + 1;
     // Calculate the day of the month (1-30 for months 1-12, 1-5 or 1-6 for month 13)
     const day = Math.floor(dayOfYear - (month - 1) * 30) + 1;
     // Return the Ethiopian date
     return [year, month, day];
  }

  // Expects a zero-based month index
  // The Julian Day starts at noon, not at midnight.
  // So, when you convert a Gregorian date to a Julian Day number,
  // the result is the Julian Day number for the noon of that day.
  // If the time of the date is noon or later, the Julian Day number will be for the next day.
  convertToJulian(
    calendarYear,
    calendarMonth,
    calendarDay,
    hour = 0,
    minute = 0,
    second = 0
  ) {
    // Calculate the Julian Day number for the start of this Ethiopian year
    const yearStart =
      (calendarYear - 1) * 365 +
      Math.floor(calendarYear / 4) +
      this.julianDayEpoch;
    // Calculate the Julian Day number for the start of this Ethiopian month
    const monthStart = yearStart + calendarMonth * 30;
    // Calculate the Julian Day number for this Ethiopian day
    const dayStart = monthStart + calendarDay - 1;
    // Adjust for the time of day
    const time = (second + 60 * (minute + 60 * hour)) / 86400.0;
    // Return the total Julian Day number
    return dayStart + time;
  }

  convertFromGregorian(date) {
    date = this.validateDate(date);

    const julianDay =
      CalendarUtils.gregorian_to_jd(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ) +
      Math.floor(
        date.getSeconds() +
          60 * (date.getMinutes() + 60 * date.getHours()) +
          0.5
      ) /
        86400.0 -
      0.5;
    const convertedDateArray = this.convertFromJulian(julianDay);
    return {
      year: convertedDateArray[0],
      month: convertedDateArray[1] - 1, // -1 because the month is 0-based
      day: convertedDateArray[2],
    };
  }

  // Returns a zero-based month index
  // Expects a zero-based month index
  convertToGregorian(
    calendarYear,
    calendarMonth,
    calendarDay,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0
  ) {
    const julianDay = this.convertToJulian(
      calendarYear,
      calendarMonth,
      calendarDay,
      hour,
      minute,
      second,
      millisecond
    );
    const gregorianDateArray = CalendarUtils.jd_to_gregorian(julianDay - 0.5);
    return {
      year: gregorianDateArray[0],
      month: gregorianDateArray[1] - 1, // -1 because the Gregorian month is 0-based
      day: gregorianDateArray[2],
    };
  }

  isLeapYear() {
    this.$y = this.$y + (this.$y < 0 ? 1 : 0); // No year zero
    return this.$y % 4 === 3 || this.$y % 4 === -1;
  }

  monthNames(
    locale = "en",
    calendar = "ethiopic",
    firstMonthName = "Meskerem"
  ) {
    return generateMonthNames(locale, calendar, firstMonthName);
  }
  getLocalizedMonthName(monthIndex) {
    return this.monthNamesLocalized[monthIndex];
  }
}
