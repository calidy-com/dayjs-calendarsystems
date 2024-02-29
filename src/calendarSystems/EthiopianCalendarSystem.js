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
    this.julianDayEpoch = 1724220.5;//1724219;
    // Julian date of start of Ethiopian epoch: 11 September 8 CE (Gregorian).
    //this.julianDayEpoch = 1724204.5
    this.intlCalendar = "ethiopic";
    this.firstMonthNameEnglish = "Meskerem";
    this.monthNamesLocalized = generateMonthNames(
      locale,
      "ethiopic",
      "Meskerem"
    );
  }

  // Returns a zero-based month index
  /**
   * Converts a Julian Day Number to an Ethiopian date.
   * @param {number} jdn - The Julian Day Number.
   * @returns {Object} An object containing the Ethiopian year, month, and day.
   */
  convertFromJulian(julianDayNumber) {
    julianDayNumber = julianDayNumber + 0.5;
    const year = Math.floor((4 * (julianDayNumber - this.julianDayEpoch) + 1463) / 1461);
    const month = 1 + Math.floor((julianDayNumber - this.convertToJulian(year, 0, 1)) / 30);
    const day = julianDayNumber + 1 - this.convertToJulian(year, month - 1, 1);
    return [year, month - 1, day];
    /*
    // The Julian Day starts at noon, not at midnight.
    julianDayNumber = julianDayNumber + 0.5;
    // Calculate the number of days since the Ethiopian epoch
    const daysSinceEpoch = Math.floor(julianDayNumber) - this.julianDayEpoch;
    // Calculate the Ethiopian year
    const year = Math.floor((daysSinceEpoch - Math.floor((daysSinceEpoch + 366) / 1461)) / 365) + 1;
    // Calculate the day of the year (1-366)
    const dayOfYear = daysSinceEpoch - (year - 1) * 365 - Math.floor((year - 1) / 4);
    // Calculate the Ethiopian month (1-13)
    const month = dayOfYear > 330 ? 13 : Math.floor((dayOfYear - 1) / 30) + 1;
    // Calculate the day of the month (1-30 for months 1-12, 1-5 or 1-6 for month 13)
    const day = (dayOfYear - 1) % 30 + 1; // Corrected to ensure days do not exceed 30 for months 1-12

    // Adjust the month index to be zero-based
    return [year, month - 1, day];
    */
}

  // Expects a zero-based month index
  // The Julian Day starts at noon, not at midnight.
  // So, when you convert a Gregorian date to a Julian Day number,
  // the result is the Julian Day number for the noon of that day.
  // If the time of the date is noon or later, the Julian Day number will be for the next day.
  wip_convertToJulian(
    calendarYear,
    calendarMonth,
    calendarDay,
    hour = 0,
    minute = 0,
    second = 0
  ) {
    return (
      this.julianDayEpoch -
      1 +
      365 * (calendarYear - 1) +
      Math.floor(calendarYear / 4) +
      30 * (calendarMonth - 1) +
      calendarDay
    );

    // Calculate the Julian Day number for the start of this Ethiopian year
    const yearStart =
      (calendarYear - 1) * 365 +
      Math.floor(calendarYear / 4) +
      this.julianDayEpoch;
    // Calculate the Julian Day number for the start of this Ethiopian month
    const monthStart = yearStart + calendarMonth * 30;
    // Calculate the Julian Day number for this Ethiopian day
    const dayStart = monthStart + calendarDay + 0.5;
    // Adjust for the time of day
    const time = Math.floor(second + 60 * (minute + 60 * hour) + 0.5) / 86400.0
    console.log('dayStarttime', dayStart+time);
    // Return the total Julian Day number
    return dayStart + time;
  }
  convertToJulian(calendarYear, calendarMonth, calendarDay, hour = 0, minute = 0, second = 0) {
    // Check if the current year is a leap year in the Ethiopian calendar
    const isLeapYear = ((calendarYear + 1) % 4 === 0); // Ethiopian leap years occur every 4 years, offset by 1 from the Gregorian calendar

    // Calculate the Julian Day number for the start of this Ethiopian year
    const yearStart = (calendarYear - 1) * 365 + Math.floor((calendarYear - 1) / 4) + this.julianDayEpoch;

    // Adjust the calculation for the 13th month in a leap year
    let monthStart;
    if (calendarMonth < 12) { // For months 1-12, the calculation remains the same
        monthStart = yearStart + calendarMonth * 30;
    } else { // For the 13th month, adjust based on whether it's a leap year
        monthStart = yearStart + 12 * 30 + (isLeapYear ? calendarDay : calendarDay - 1);
    }

    // Calculate the Julian Day number for this Ethiopian day
    const dayStart = monthStart + calendarDay - 1;

    // Adjust for the time of day
    const time = (second + 60 * (minute + 60 * hour)) / 86400.0;

    // Return the total Julian Day number, adjusting for noon start of Julian Day
    return dayStart + time + 0.5;
}

  // Convert from Gregorian date to Ethiopian date
  // Returns a zero-based month index
  // Expects a zero-based month index
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
      month: convertedDateArray[1],
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

  old_isLeapYear(year=null) {
    if(year === null) {
      year = this.$y;
    }
    year = year + (year < 0 ? 1 : 0); // No year zero
    return year % 4 === 3 || year % 4 === -1;
  }
  isLeapYear(year = null) {
    if (year === null) {
      year = this.$y;
    }
    // Adjusting for the Ethiopian calendar's leap year cycle
    return (year + 1) % 4 === 0;
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
