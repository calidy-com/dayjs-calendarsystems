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

  // Returns a zero-based month index
  /**
   * Converts a Julian Day Number to an Amazigh date.
   * @param {number} jdn - The Julian Day Number.
   * @returns {Object} An object containing the Amazigh year, month, and day.
   */
  convertFromJulian(julianDayNumber) {
    // The Julian Day starts at noon, not at midnight.
    julianDayNumber = julianDayNumber + 0.5;
    const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(julianDayNumber);
    const amazighDate = this.adjustForYennayer({
      year: gy,
      month: gm - 1, // -1 because the jd_to_gregorian returns 1-based months but we need 0-based months for adjustForYennayer
      day: gd,
    });
    return new Array(amazighDate.year, amazighDate.month, amazighDate.day);
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
    // Convert Amazigh year to Gregorian year
    const gregorianYear = calendarYear - 950; // Amazigh calendar starts in 950 BC in the Gregorian calendar

    // Initial conversion without adjusting for Yennayer
    let gregorianDate = {
      year: gregorianYear,
      month: calendarMonth,
      day: calendarDay,
    };

    const yennayerGregorianDate = new Date(gregorianYear, 0, 14); // January is month 0 in JavaScript Date

    // Calculate the Julian Day Number (JDN) for Yennayer
    let julianDayYennayer = CalendarUtils.gregorian_to_jd(
      yennayerGregorianDate.getFullYear(),
      yennayerGregorianDate.getMonth() + 1,
      yennayerGregorianDate.getDate()
    );

    // Step 3: Calculate the total number of days from Yennayer to the given Amazigh date
    // Adjust month and day based on dayOfYear
    const daysInMonths = [
      31,
      calendarYear % 4 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ]; // Considering leap years
    let daysSinceYennayer = 0;
    for (let month = 0; month < calendarMonth; month++) {
      // Assuming 30 days per month for simplicity; adjust based on the actual Amazigh calendar if necessary
      daysSinceYennayer += daysInMonths[month];
    }

    daysSinceYennayer += calendarDay - 1; // Subtract 1 since Yennayer is day 1

    // Calculate the final Julian Day Number (JDN) by adding the days since Yennayer to the JDN of Yennayer
    let finalJdn = julianDayYennayer + daysSinceYennayer
    // Adjust for the time of day
     + Math.floor(second + 60 * (minute + 60 * hour) + 0.5) / 86400.0

    return finalJdn;
  }

  // Convert from Gregorian date to Amazigh date
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

  isLeapYear(year = null) {
    if (year === null) {
      year = this.$y;
    }
    // Amazigh calendar follows Julian calendar leap year rules (every 4 years, no exceptions)
    // Convert to Gregorian year to determine leap year
    const adjustedYear = year + 950;
    return (
      (adjustedYear % 4 === 0 && adjustedYear % 100 !== 0) ||
      adjustedYear % 400 === 0
    );
  }

  /**
   * Get the number of days in an Amazigh calendar month
   *
   * @param {number} year - Amazigh year
   * @param {number} month - Month (0-based, 0 = Yennayer)
   * @returns {number} Number of days in the month
   */
  daysInMonth(year, month) {
    // Amazigh calendar follows Julian calendar month structure
    // Months: 31, 28/29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    const monthLengths = [
      31, // Yennayer (January)
      this.isLeapYear(year) ? 29 : 28, // Furar (February)
      31, // Meghres (March)
      30, // Yebrir (April)
      31, // Mayu (May)
      30, // Yunyu (June)
      31, // Yulyuz (July)
      31, // Ghusht (August)
      30, // Shutembir (September)
      31, // Ktuber (October)
      30, // Wanbir (November)
      31  // Dujembir (December)
    ];
    return monthLengths[month];
  }

  monthNames(locale = "en", calendar = "amazigh", firstMonthName = "Yennayer") {
    return generateMonthNames(locale, calendar, firstMonthName);
  }

  getLocalizedMonthName(monthIndex) {
    return this.monthNamesLocalized[monthIndex];
  }

  gregorianToAmazighYear(gregorianYear) {
    // The Amazigh year 2974 corresponds to Gregorian year 2024
    const referenceAmazighYear = 2974;
    const referenceGregorianYear = 2024;
    const yearDifference = gregorianYear - referenceGregorianYear;
    return referenceAmazighYear + yearDifference;
  }

  // Returns a zero-based month index
  // Expects a zero-based month index
  adjustForYennayer(gregorianDate) {
    // Constants for the Amazigh New Year in the Gregorian calendar
    const yennayerMonth = 0; // January, zero-based index
    const yennayerDay = 14;

    // Convert the Gregorian year to the Amazigh year
    let amazighYear = this.gregorianToAmazighYear(gregorianDate.year);

    // Check if the Gregorian date is before Yennayer and adjust the Amazigh year accordingly
    if (
      gregorianDate.month < yennayerMonth ||
      (gregorianDate.month === yennayerMonth && gregorianDate.day < yennayerDay)
    ) {
      amazighYear -= 1; // The date is in the previous Amazigh year
    }

    // Calculate the Julian Day Number for the given Gregorian date and for Yennayer
    const jdnForGregorianDate = CalendarUtils.gregorian_to_jd(
      gregorianDate.year,
      gregorianDate.month + 1,
      gregorianDate.day
    );
    const jdnForYennayerThisYear = CalendarUtils.gregorian_to_jd(
      gregorianDate.year,
      yennayerMonth + 1,
      yennayerDay
    );

    // Determine if we need to use Yennayer from the previous Gregorian year for the calculation
    const usePreviousYearYennayer =
      gregorianDate.month < yennayerMonth ||
      (gregorianDate.month === yennayerMonth &&
        gregorianDate.day < yennayerDay);
    const jdnForYennayer = usePreviousYearYennayer
      ? CalendarUtils.gregorian_to_jd(
          gregorianDate.year - 1,
          yennayerMonth + 1,
          yennayerDay
        )
      : jdnForYennayerThisYear;

    // Calculate the day of the year in the Amazigh calendar
    let dayOfYear = jdnForGregorianDate - jdnForYennayer + 1; // +1 because Yennayer is day 1

    // Determine the Amazigh month and day from the day of the year
    const daysInAmazighMonths = [
      31,
      amazighYear % 4 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ]; // Considering leap years
    let month = 0;
    while (dayOfYear > daysInAmazighMonths[month]) {
      dayOfYear -= daysInAmazighMonths[month];
      month++;
    }

    // Adjust month to be zero-based and ensure dayOfYear is correctly calculated
    return { year: amazighYear, month: month + 1, day: dayOfYear };
  }
}
