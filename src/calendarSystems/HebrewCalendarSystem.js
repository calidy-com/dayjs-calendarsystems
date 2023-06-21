/**
 * Hebrew Calendar System
 *
 * @file HebrewCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

export default class HebrewCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 0; // Saturday
    this.locale = locale;
    this.intlCalendar = "hebrew";
    this.firstMonthNameEnglish = "Nisan";
    this.monthNamesLocalized = generateMonthNames(locale, "hebrew", "Nisan");
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
      CalendarUtils.hebrew_to_jd(calendarYear, calendarMonth + 1, calendarDay) +
      // TODO: Clarify why we do not need +0.5 to adjust the time to midnight.
      0 +
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
    const convertedDateArray = CalendarUtils.jd_to_hebrew(julianDay);
    return {
      year: convertedDateArray[0],
      month: convertedDateArray[1] - 1, // -1 because the Persian month is 0-based
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

  isLeapYear() {
    return CalendarUtils.hebrew_leap(this.$y);
  }

  monthNames(locale = "en", calendar = "hebrew", firstMonthName = "Nisan") {
    return generateMonthNames(locale, calendar, firstMonthName);
  }
  getLocalizedMonthName(monthIndex) {
    return this.monthNamesLocalized[monthIndex];
  }
}
