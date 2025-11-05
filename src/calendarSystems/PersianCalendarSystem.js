/**
 * Persian Calendar System
 *
 * @file PersianCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

export default class PersianCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 6; // Saturday
    this.locale = locale;
    this.intlCalendar = "persian";
    this.firstMonthNameEnglish = "Farvardin";
    this.monthNamesLocalized = generateMonthNames(
      locale,
      "persian",
      "Farvardin"
    );
    // months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
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
    // calendarMonth = calendarMonth+1 because the *_to_jd function month is 1-based
    return (
      CalendarUtils.persiana_to_jd(calendarYear, calendarMonth + 1, calendarDay) +
      // We adjust the time to midnight. (noon -> midnight , diff 0.5)
      0.5 +
      Math.floor(second + 60 * (minute + 60 * hour) + 0.5) / 86400.0
    );
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
    const convertedDateArray = CalendarUtils.jd_to_persiana(julianDay);
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
    const gregorianDateArray = CalendarUtils.jd_to_gregorian(julianDay);
    return {
      year: gregorianDateArray[0],
      month: gregorianDateArray[1] - 1, // -1 because the Gregorian month is 0-based
      day: gregorianDateArray[2],
    };
  }

  isLeapYear(year=null) {
    if(year === null) {
      year = this.$y;
    }
    return CalendarUtils.leap_persiana(year);
  }

  /**
   * Get the number of days in a Persian calendar month
   *
   * @param {number} year - Persian year
   * @param {number} month - Month (0-based, 0 = Farvardin)
   * @returns {number} Number of days in the month
   */
  daysInMonth(year, month) {
    // First 6 months (Farvardin-Shahrivar): 31 days
    if (month < 6) {
      return 31;
    }
    // Last month (Esfand): 29 days (30 in leap years)
    if (month === 11) {
      return this.isLeapYear(year) ? 30 : 29;
    }
    // Months 6-10 (Mehr-Bahman): 30 days
    return 30;
  }

  monthNames(
    locale = "en",
    calendar = "persian",
    firstMonthName = "Farvardin"
  ) {
    return generateMonthNames(locale, calendar, firstMonthName);
  }

  getLocalizedMonthName(monthIndex) {
    return this.monthNamesLocalized[monthIndex];
  }
}
