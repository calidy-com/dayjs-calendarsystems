/**
 * Amazigh Calendar System
 *
 * @file AmazighCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

export default class AmazighCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 1; // Monday
    this.locale = locale;
    this.intlCalendar = "gregory"; // Using Gregorian as base for month names
    this.firstMonthNameEnglish = "Yennayer";
    this.monthNamesLocalized = generateMonthNames(
      locale,
      "amazigh",
      "Yennayer"
    );
  }

  /**
   * Converts a Julian Day Number to an Amazigh date.
   * @param {number} jdn - The Julian Day Number.
   * @returns {Object} An object containing the Amazigh year, month, and day.
   */
  convertFromJulian(jdn) {
    // Constants for JDN of the Julian calendar start and the Amazigh calendar start year
    const JDN_JULIAN_START = 2299160.5; // October 15, 1582, Gregorian calendar start (end of Julian calendar)
    const AMZ_YEAR_START = 950; // Amazigh calendar start year in BC
    const DAYS_IN_YEAR = 365.25; // Average days in a year accounting for leap years in Julian calendar
    const GREGORIAN_START_YEAR = 1582; // Year the Gregorian calendar starts
    const YENNAYER_JDN_OFFSET = 13; // Offset for Yennayer in the Gregorian calendar as of the 21st century

    // Calculate the Gregorian year for the given JDN
    let year = GREGORIAN_START_YEAR + Math.floor((jdn - JDN_JULIAN_START) / DAYS_IN_YEAR);
    // Adjust the year based on the Amazigh calendar start year
    let amazighYear = year + (AMZ_YEAR_START - (year < 0 ? 1 : 0)); // Adjust for no year 0 in historical counting

    // Calculate the JDN for January 1st of the given year
    let jdnJan1 = jdn - ((jdn - JDN_JULIAN_START) % DAYS_IN_YEAR);
    // Calculate the day of the year from JDN
    let dayOfYear = jdn - jdnJan1 + 1; // +1 since January 1st is day 1

    // Adjust dayOfYear based on the Yennayer offset
    dayOfYear -= YENNAYER_JDN_OFFSET;

    // Correct the year and dayOfYear if the adjustment crosses into the previous year
    if (dayOfYear <= 0) {
        amazighYear -= 1;
        dayOfYear += DAYS_IN_YEAR; // Add the days in a year to the negative dayOfYear
    }

    // Determine the month and day from dayOfYear
    let month = 0, day = dayOfYear;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Days in each month for Julian calendar
    while (day > daysInMonths[month]) {
        day -= daysInMonths[month];
        month += 1;
    }

    // Adjust for the Amazigh calendar specifics if necessary
    // Note: This example uses a simplified approach and might need adjustments for leap years and accurate month lengths

    return [
        amazighYear,
        month + 1, // +1 to make the month 1-based
        day
    ];
}


  // Convert Amazigh date to Julian Day
  convertToJulian(calendarYear, calendarMonth, calendarDay) {
    // Convert Amazigh year to Gregorian year
    const gregorianYear = calendarYear + 950;
    // Adjusting for Yennayer starting on January 14th in the Gregorian calendar
    const isBeforeYennayer = calendarMonth === 0 && calendarDay < 14;
    const adjustedYear = gregorianYear - (isBeforeYennayer ? 1 : 0);
    const adjustedMonth = isBeforeYennayer ? 12 : calendarMonth + 1; // Adjust month to 1-based for calculation
    const adjustedDay = calendarDay + (isBeforeYennayer ? 18 : 13); // Adjust days for Yennayer start, considering the current 13-day discrepancy

    // Convert adjusted Gregorian date to Julian Day
    return CalendarUtils.gregorian_to_jd(adjustedYear, adjustedMonth, adjustedDay);
  }


  // Convert from Gregorian date to Amazigh date
  convertFromGregorian(date) {
    const julianDay = CalendarUtils.gregorian_to_jd(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1; // 1-based month
    const gregorianDay = date.getDate();

    // Calculate the Amazigh year
    let amazighYear = gregorianYear - 950;
    if (gregorianMonth < 1 || (gregorianMonth === 1 && gregorianDay < 14)) {
      amazighYear -= 1; // Adjust for Yennayer
    }

    // Convert Julian day back to Gregorian to adjust for Yennayer offset
    const { year, month, day } = CalendarUtils.jd_to_gregorian(julianDay - 13);

    return {
      year: year - 950,
      month: month - 1, // Convert to 0-based month index
      day: day,
    };
  }

  convertToGregorian(calendarYear, calendarMonth, calendarDay) {
    // Calculate the Gregorian year for the given Amazigh year.
    const baseYear = -950; // Starting point of the Amazigh calendar in the Gregorian calendar (950 BC).
    let gregorianYear = calendarYear + baseYear;

    // Adjust for the current discrepancy between the Julian and Gregorian calendars.
    const discrepancyDays = 13; // As of the 21st century, there's a 13-day difference between the calendars.
    const yennayerGregorianDate = new Date(gregorianYear, 0, 14 + discrepancyDays); // January 14th + discrepancy in days.

    // Calculate the Julian Day Number for Yennayer of the given Gregorian year.
    let julianDayYennayer = this.convertToJulian(yennayerGregorianDate.getFullYear(), yennayerGregorianDate.getMonth(), yennayerGregorianDate.getDate());

    // Considering the Amazigh calendar follows the Julian calendar with months having the same length,
    // we calculate the total number of days since Yennayer to the Amazigh date.
    let daysSinceYennayer = 0;
    for (let month = 0; month < calendarMonth; month++) {
        daysSinceYennayer += month === 1 ? 28 : (month < 7 ? (month % 2 === 0 ? 31 : 30) : (month % 2 === 0 ? 30 : 31));
    }
    daysSinceYennayer += calendarDay - 1; // Subtract one since Yennayer is considered day 1.

    // Calculate the total Julian Day and convert it back to a Gregorian date.
    let julianDay = julianDayYennayer + daysSinceYennayer;
    const gregorianDateArray = CalendarUtils.jd_to_gregorian(julianDay);
    return {
      year: gregorianDateArray[0],
      month: gregorianDateArray[1] - 1, // -1 because the Gregorian month is 0-based
      day: gregorianDateArray[2],
    };
}

  isLeapYear(year) {
    // Adjust if Amazigh leap year rules differ, using Gregorian as placeholder
    const adjustedYear = year + 950;
    return (adjustedYear % 4 === 0 && adjustedYear % 100 !== 0) || adjustedYear % 400 === 0;
  }
  monthNames(
    locale = "en",
    calendar = "amazigh",
    firstMonthName = "Yennayer"
  ) {
    return generateMonthNames(locale, calendar, firstMonthName);
  }

  getLocalizedMonthName(monthIndex) {
    return this.monthNamesLocalized[monthIndex];
  }
}

