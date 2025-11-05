/**
 * Gregorian Calendar System
 *
 * @file GregoryCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

import CalendarSystemBase from "./CalendarSystemBase";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

export default class GregoryCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 6; // Saturday
    this.locale = locale;
    this.intlCalendar = "gregory";
    this.firstMonthNameEnglish = "January";
    this.monthNamesLocalized = generateMonthNames(locale, "gregory", "January");
  }

  // Expects a zero-based month index
  convertToJulian(calendarYear, calendarMonth, calendarDay) {
    // calendarMonth = calendarMonth+1 because the *_to_jd function month is 1-based
    return CalendarUtils.gregorian_to_jd(
      calendarYear,
      calendarMonth + 1,
      calendarDay
    );
  }

  convertFromGregorian(date) {
    date = this.validateDate(date);

    return date;
  }

  convertToGregorian(year, month, day) {
    return {
      year: year,
      month: month,
      day: day,
    };
  }

  isLeapYear(year = null) {
    if (year === null) {
      year = this.$y;
    }
    return year % 4 == 0 && !(year % 100 == 0 && year % 400 != 0);
  }

  monthNames(locale = "en", calendar = "gregory", firstMonthName = "January") {
    return generateMonthNames(locale, calendar, firstMonthName);
  }
}
