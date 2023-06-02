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
  convertToJulian(calendarYear, calendarMonth, calendarDay) {
    // calendarMonth = calendarMonth+1 because the *_to_jd function month is 1-based
    return CalendarUtils.hebrew_to_jd(
      calendarYear,
      calendarMonth + 1,
      calendarDay
    );
  }

  convertFromGregorian(date) {
    // extract year, month, day from date.
    // date can be of type Date, Dayjs or object.
    // if date is object, it should have year, month and day properties.
    // if date is Dayjs, it should have $y, $M and $D properties.
    // if date is Date, it should have getFullYear(), getMonth() and getDate() methods.
    // if date is string, it should be in ISO format.
    // if date is number, it should be in milliseconds.
    // if date is undefined, it should be now.
    // if date is null, it should be now.
    if (date === undefined || date === null) {
      date = new Date();
    } else if (typeof date === "string") {
      date = new Date(date);
    } else if (typeof date === "number") {
      date = new Date(date);
    } else if (date instanceof Date) {
      // do nothing
    } else if (
      date.$y !== undefined &&
      date.$M !== undefined &&
      date.$D !== undefined
    ) {
      date = new Date(date.$y, date.$M, date.$D);
    } else if (
      date.year !== undefined &&
      date.month !== undefined &&
      date.day !== undefined
    ) {
      date = new Date(date.year, date.month, date.day);
    } else {
      throw new Error("Invalid date");
    }

    const julianDay = CalendarUtils.gregorian_to_jd(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    const convertedDateArray = CalendarUtils.jd_to_hebrew(julianDay);
    return {
      year: convertedDateArray[0],
      month: convertedDateArray[1] - 1, // -1 because the Persian month is 0-based
      day: convertedDateArray[2],
    };
  }

  // Expects a zero-based month index
  // Returns a zero-based month index
  convertToGregorian(calendarYear, calendarMonth, calendarDay) {
    const julianDay = this.convertToJulian(
      calendarYear,
      calendarMonth,
      calendarDay
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
