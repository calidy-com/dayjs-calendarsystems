/**
 * Indian National Calendar System (Saka Calendar)
 *
 * @file IndianCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com (https://calidy.com/)
 * @description Indian National Calendar (Saka Calendar) implementation
 *
 * The Indian National Calendar, also called the Saka calendar or Śaka calendar,
 * is the official civil calendar used in India alongside the Gregorian calendar.
 * It was adopted on March 22, 1957, based on recommendations by the Calendar
 * Reform Committee under the aegis of CSIR (led by Dr. Meghnad Saha).
 *
 * Calendar Structure:
 * - Solar calendar with 12 months
 * - First month: Chaitra (30 days, 31 in leap years)
 * - Next 5 months (Vaisakha-Bhadra): 31 days each
 * - Last 6 months (Asvina-Phalguna): 30 days each
 * - Total: 365 days (366 in leap years)
 *
 * Era:
 * - Years are counted in the Saka era
 * - Saka year 0 begins in 78 CE (Gregorian)
 * - Conversion: Saka Year + 78 = Gregorian Year (approximately)
 *
 * New Year:
 * - Chaitra 1 falls on March 22 (normal year) or March 21 (leap year)
 * - Corresponds to the day after vernal equinox
 *
 * Leap Years:
 * - Synchronized with Gregorian calendar
 * - If (Saka year + 78) is a Gregorian leap year, then Saka year is a leap year
 *
 * @see https://en.wikipedia.org/wiki/Indian_national_calendar
 * @see https://www.india.gov.in (Government of India official sources)
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

// Calculate epoch: March 22, 78 CE (Gregorian)
// Using the gregorian_to_jd function: gregorian_to_jd(78, 3, 22)
// Note: In leap years, the New Year starts on March 21 instead of March 22
// We use March 22, 78 CE as the base epoch (Saka year 0, Chaitra 1)
// The Saka era begins in 78 CE with year 0 (unlike Gregorian which starts at year 1)
// This means Saka + 78 = Gregorian year (for dates after Chaitra 1)
// gregorian_to_jd(78, 3, 22) = 1749629.5
const INDIAN_EPOCH_JD = 1749629.5; // March 22, 78 CE (Gregorian) = Saka year 0, Chaitra 1

// Month names in English (transliterated from Devanagari)
const INDIAN_MONTH_NAMES = [
  "Chaitra",     // चैत्र (March-April)
  "Vaisakha",    // वैशाख (April-May)
  "Jyaistha",    // ज्येष्ठ (May-June)
  "Asadha",      // आषाढ (June-July)
  "Sravana",     // श्रावण (July-August)
  "Bhadra",      // भाद्रपद (August-September)
  "Asvina",      // आश्विन (September-October)
  "Kartika",     // कार्तिक (October-November)
  "Agrahayana",  // अग्रहायण/मार्गशीर्ष (November-December)
  "Pausa",       // पौष (December-January)
  "Magha",       // माघ (January-February)
  "Phalguna"     // फाल्गुन (February-March)
];

export default class IndianCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 0; // Sunday
    this.locale = locale;
    this.julianDayEpoch = INDIAN_EPOCH_JD;
    this.intlCalendar = "indian";
    this.firstMonthNameEnglish = "Chaitra";
    this.monthNamesLocalized = this.monthNames(locale);
  }

  /**
   * Determine if a Saka year is a leap year
   *
   * The Indian National Calendar's leap years are synchronized with the
   * Gregorian calendar. A Saka year is a leap year if and only if the
   * corresponding Gregorian year (Saka year + 78) is a leap year.
   *
   * @param {number} year - Saka year (null to use current instance year)
   * @returns {boolean} True if leap year
   */
  isLeapYear(year = null) {
    if (year === null) {
      year = this.$y;
    }

    // Convert Saka year to Gregorian year
    const gregorianYear = year + 78;

    // Apply Gregorian leap year rules
    return (
      (gregorianYear % 4 === 0 && gregorianYear % 100 !== 0) ||
      gregorianYear % 400 === 0
    );
  }

  /**
   * Get the number of days in a specific Saka calendar month
   *
   * Month structure:
   * - Chaitra (month 0): 30 days (31 in leap years)
   * - Vaisakha to Bhadra (months 1-5): 31 days each
   * - Asvina to Phalguna (months 6-11): 30 days each
   *
   * @param {number} year - Saka year
   * @param {number} month - Month (0-based, 0 = Chaitra)
   * @returns {number} Number of days in the month
   */
  daysInMonth(year, month) {
    if (month < 0 || month > 11) {
      throw new Error("Invalid month. Indian calendar has months 0-11.");
    }

    // Chaitra (first month): 30 days, 31 in leap years
    if (month === 0) {
      return this.isLeapYear(year) ? 31 : 30;
    }

    // Vaisakha to Bhadra (months 1-5): 31 days
    if (month >= 1 && month <= 5) {
      return 31;
    }

    // Asvina to Phalguna (months 6-11): 30 days
    return 30;
  }

  /**
   * Convert Indian calendar date to Julian Day Number
   *
   * @param {number} year - Saka year
   * @param {number} month - Month (0-based)
   * @param {number} day - Day of month (1-based)
   * @param {number} hour - Hour (0-23)
   * @param {number} minute - Minute (0-59)
   * @param {number} second - Second (0-59)
   * @returns {number} Julian Day Number
   */
  convertToJulian(year, month, day, hour = 0, minute = 0, second = 0) {
    // Calculate days from start of Saka year to start of month
    let daysFromMonths = 0;

    for (let m = 0; m < month; m++) {
      daysFromMonths += this.daysInMonth(year, m);
    }

    // Calculate total days since epoch
    // Start by calculating how many days have passed in complete years
    // Note: epoch is year 0, so we count from year 0
    let daysSinceEpoch = 0;

    // Add days for all complete years before this one (starting from year 0)
    for (let y = 0; y < year; y++) {
      daysSinceEpoch += this.isLeapYear(y) ? 366 : 365;
    }

    // Add days for complete months in current year
    daysSinceEpoch += daysFromMonths;

    // Add day of month (subtract 1 because day is 1-based)
    daysSinceEpoch += day - 1;

    // Calculate the Julian Day number
    const julianDay = this.julianDayEpoch + daysSinceEpoch;

    // Add time component
    const timeInDays = (second + 60 * (minute + 60 * hour)) / 86400.0;

    // Return the total Julian Day number, adjusting for noon start of Julian Day
    return julianDay + timeInDays + 0.5;
  }

  /**
   * Convert Julian Day Number to Indian calendar date
   *
   * @param {number} julianDayNumber - Julian Day Number
   * @returns {Array} [year, month, day] with 0-based month
   */
  convertFromJulian(julianDayNumber) {
    // Adjust to start of day
    julianDayNumber = Math.floor(julianDayNumber + 0.5);

    // Calculate the number of days since Saka epoch
    // Note: The epoch (March 22, 78 CE) is Saka year 0, Chaitra 1
    let daysSinceEpoch = Math.floor(julianDayNumber - this.julianDayEpoch);

    // Find the year by iterating (could be optimized but this is accurate)
    // Start from year 0 (Saka era has year 0, unlike Gregorian)
    let year = 0;
    let daysInCurrentYear = this.isLeapYear(year) ? 366 : 365;

    while (daysSinceEpoch >= daysInCurrentYear) {
      daysSinceEpoch -= daysInCurrentYear;
      year++;
      daysInCurrentYear = this.isLeapYear(year) ? 366 : 365;
    }

    // Now daysSinceEpoch contains the day of year (0-based)
    // Find the month and day
    let month = 0;
    let daysInCurrentMonth = this.daysInMonth(year, month);

    while (daysSinceEpoch >= daysInCurrentMonth) {
      daysSinceEpoch -= daysInCurrentMonth;
      month++;
      daysInCurrentMonth = this.daysInMonth(year, month);
    }

    // daysSinceEpoch is now the day within the month (0-based)
    const day = daysSinceEpoch + 1; // Convert to 1-based

    return [year, month, day];
  }

  /**
   * Convert from Gregorian date to Indian calendar
   *
   * @param {Date} date - JavaScript Date object
   * @returns {object} {year, month, day} - Indian date with 0-based month
   */
  convertFromGregorian(date) {
    date = this.validateDate(date);

    // Convert Gregorian to Julian Day Number
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

    // Convert Julian Day to Indian date
    const [year, month, day] = this.convertFromJulian(julianDay);

    return {
      year: year,
      month: month, // 0-based
      day: day
    };
  }

  /**
   * Convert from Indian calendar to Gregorian date
   *
   * @param {number} year - Saka year
   * @param {number} month - Month (0-based)
   * @param {number} day - Day of month (1-based)
   * @param {number} hour - Hour (0-23)
   * @param {number} minute - Minute (0-59)
   * @param {number} second - Second (0-59)
   * @param {number} millisecond - Millisecond (0-999)
   * @returns {object} {year, month, day} - Gregorian date with 0-based month
   */
  convertToGregorian(
    year,
    month,
    day,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0
  ) {
    // Convert Indian to Julian Day Number
    const julianDay = this.convertToJulian(
      year,
      month,
      day,
      hour,
      minute,
      second
    );

    // Convert Julian Day to Gregorian
    const gregorianArray = CalendarUtils.jd_to_gregorian(julianDay);

    return {
      year: gregorianArray[0],
      month: gregorianArray[1] - 1, // Convert to 0-based
      day: gregorianArray[2]
    };
  }

  /**
   * Get month names
   *
   * @param {string} locale - Locale code
   * @returns {Array<string>} Array of month names
   */
  monthNames(locale = "en") {
    // The Intl API doesn't have built-in support for Indian calendar
    // so we return the English transliterated names
    // In future, this could be enhanced with locale-specific names
    return INDIAN_MONTH_NAMES;
  }

  /**
   * Get localized month name
   *
   * @param {number} monthIndex - Month index (0-11)
   * @returns {string} Month name
   */
  getLocalizedMonthName(monthIndex) {
    if (monthIndex < 0 || monthIndex > 11) {
      throw new Error("Invalid month index. Indian calendar has 12 months (0-11).");
    }
    return INDIAN_MONTH_NAMES[monthIndex];
  }

  /**
   * Get locale override for dayjs
   *
   * @param {string} locale - Locale code
   * @returns {object} Locale configuration object
   */
  localeOverride(locale) {
    const months = this.monthNames(locale);
    return {
      gregorianMonths: INDIAN_MONTH_NAMES,
      months: months,
      monthsShort: months.map((month) => month.substring(0, 3)),
    };
  }
}
