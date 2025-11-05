/**
 * Hijri Calendar System
 *
 * @file HijriCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

export default class HijriCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 6; // Saturday
    this.locale = locale;
    this.intlCalendar = "islamic-umalqura";
    this.firstMonthNameEnglish = "Muharram";
    this.monthNamesLocalized = generateMonthNames(
      locale,
      "islamic-umalqura",
      "Muharram"
    );
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
    // First convert Hijri to Gregorian
    const gregorian = this.convertToGregorian(
      calendarYear,
      calendarMonth,
      calendarDay,
      hour,
      minute,
      second
    );

    // Then convert Gregorian to Julian Day
    return (
      CalendarUtils.gregorian_to_jd(
        gregorian.year,
        gregorian.month + 1,
        gregorian.day
      ) +
      Math.floor(second + 60 * (minute + 60 * hour) + 0.5) / 86400.0 -
      0.5
    );
  }

  convertFromGregorian(date) {
    date = this.validateDate(date);

    // Use Intl.DateTimeFormat with islamic-umalqura calendar for accurate conversion
    // The Islamic calendar has multiple variants; islamic-umalqura is based on astronomical
    // observations and is the official calendar used in Saudi Arabia
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC'
    });

    // Create a UTC date to avoid timezone issues
    const utcDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ));

    // Format the date and parse the parts
    const parts = formatter.formatToParts(utcDate);
    const hijriDate = {};

    parts.forEach(part => {
      if (part.type === 'year') {
        hijriDate.year = parseInt(part.value, 10);
      } else if (part.type === 'month') {
        hijriDate.month = parseInt(part.value, 10) - 1; // Convert to 0-based
      } else if (part.type === 'day') {
        hijriDate.day = parseInt(part.value, 10);
      }
    });

    return hijriDate;
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
    // Since Intl API only converts Gregorian->Hijri, we use binary search
    // to find the Gregorian date that corresponds to the given Hijri date

    // Approximate starting year: Hijri year 1 ≈ Gregorian year 622 CE
    const approxYear = Math.floor(calendarYear - 1 + 622 + (calendarYear - 1) * 0.030684); // Adjust for year length difference

    // Search within a range of ±2 years
    let low = Date.UTC(approxYear - 2, 0, 1);
    let high = Date.UTC(approxYear + 2, 11, 31);
    let result = null;

    // Binary search for the matching date
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midDate = new Date(mid);
      const hijri = this.convertFromGregorian(midDate);

      // Compare Hijri dates
      if (hijri.year === calendarYear &&
          hijri.month === calendarMonth &&
          hijri.day === calendarDay) {
        result = midDate;
        break;
      }

      // Calculate comparison value
      const hijriValue = hijri.year * 10000 + (hijri.month + 1) * 100 + hijri.day;
      const targetValue = calendarYear * 10000 + (calendarMonth + 1) * 100 + calendarDay;

      if (hijriValue < targetValue) {
        low = mid + 86400000; // Add one day in milliseconds
      } else {
        high = mid - 86400000; // Subtract one day in milliseconds
      }
    }

    if (!result) {
      // Fallback: Use old Julian Day method if binary search fails
      // This uses the arithmetic Islamic calendar as an approximation
      const julianDay = CalendarUtils.islamic_to_jd(
        calendarYear,
        calendarMonth + 1,
        calendarDay
      ) + Math.floor(second + 60 * (minute + 60 * hour) + 0.5) / 86400.0;

      const gregorianDateArray = CalendarUtils.jd_to_gregorian(julianDay);
      return {
        year: gregorianDateArray[0],
        month: gregorianDateArray[1] - 1,
        day: gregorianDateArray[2],
      };
    }

    // Set the time components
    result.setUTCHours(hour);
    result.setUTCMinutes(minute);
    result.setUTCSeconds(second);
    result.setUTCMilliseconds(millisecond);

    return {
      year: result.getUTCFullYear(),
      month: result.getUTCMonth(), // Already 0-based
      day: result.getUTCDate(),
    };
  }

  isLeapYear(year=null) {
    if(year === null) {
      year = this.$y;
    }
    return CalendarUtils.leap_islamic(year);
  }

  /**
   * Get the number of days in a Hijri month
   *
   * @param {number} year - Hijri year
   * @param {number} month - Month (0-based, 0 = Muharram)
   * @returns {number} Number of days in the month
   */
  daysInMonth(year, month) {
    // In the Islamic calendar:
    // Odd months (0, 2, 4, 6, 8, 10) have 30 days
    // Even months (1, 3, 5, 7, 9) have 29 days
    // Month 11 (Dhu al-Hijjah) has 29 days in common years and 30 days in leap years
    if (month === 11) {
      return this.isLeapYear(year) ? 30 : 29;
    }
    return (month % 2 === 0) ? 30 : 29;
  }

  monthNames(
    locale = "en",
    calendar = "islamic-umalqura",
    firstMonthName = "Muharram"
  ) {
    return generateMonthNames(locale, calendar, firstMonthName);
  }
  getLocalizedMonthName(monthIndex) {
    return this.monthNamesLocalized[monthIndex];
  }
}
