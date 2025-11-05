/**
 * Ethiopian Calendar System
 *
 * @file EthiopianCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description Ethiopian calendar implementation based on the Coptic calendar
 *
 * The Ethiopian calendar (also called Ge'ez calendar) is the principal calendar
 * used in Ethiopia and Eritrea. It has 13 months:
 * - 12 months of 30 days each
 * - 13th month (Pagumen) with 5 days (6 in leap year)
 *
 * The Ethiopian calendar is approximately 7-8 years behind the Gregorian calendar.
 * Leap years occur every 4 years without exception.
 *
 * Epoch: August 29, 8 CE (Gregorian) or August 27, 8 CE (Julian)
 * New Year (Enkutatash): September 11 (or September 12 in leap year before Gregorian leap year)
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";
import { generateMonthNames } from "../calendarUtils/IntlUtils";

// Ethiopian calendar epoch in Julian Day Number
// Corresponds to August 29, 8 CE (Gregorian) / August 27, 8 CE (Julian)
const ETHIOPIAN_EPOCH_JD = 1724220.5;

// Month names in Ge'ez/Amharic
const ETHIOPIAN_MONTH_NAMES = [
  "Meskerem",  // መስከረም (September-October)
  "Tikimt",    // ጥቅምት (October-November)
  "Hidar",     // ኅዳር (November-December)
  "Tahsas",    // ታኅሣሥ (December-January)
  "Tir",       // ጥር (January-February)
  "Yekatit",   // የካቲት (February-March)
  "Megabit",   // መጋቢት (March-April)
  "Miazia",    // ሚያዝያ (April-May)
  "Genbot",    // ግንቦት (May-June)
  "Sene",      // ሰኔ (June-July)
  "Hamle",     // ሐምሌ (July-August)
  "Nehasse",   // ነሐሴ (August-September)
  "Pagumen"    // ጳጉሜን (5-6 days)
];

export default class EthiopianCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 0; // Sunday
    this.locale = locale;
    this.julianDayEpoch = ETHIOPIAN_EPOCH_JD;
    this.intlCalendar = "ethiopic";
    this.firstMonthNameEnglish = "Meskerem";
    this.monthNamesLocalized = generateMonthNames(
      locale,
      "ethiopic",
      "Meskerem"
    );
  }

  /**
   * Determine if an Ethiopian year is a leap year
   *
   * In the Ethiopian calendar, leap years occur every 4 years without exception.
   * The year before a Gregorian leap year is a leap year in the Ethiopian calendar.
   *
   * @param {number} year - Ethiopian year (null to use current instance year)
   * @returns {boolean} True if leap year
   */
  isLeapYear(year = null) {
    if (year === null) {
      year = this.$y;
    }
    // Ethiopian leap year rule: (year + 1) mod 4 == 0
    // This aligns with the Coptic calendar
    return (year + 1) % 4 === 0;
  }

  /**
   * Get the number of days in a specific Ethiopian month
   *
   * @param {number} year - Ethiopian year
   * @param {number} month - Month (0-based, 0 = Meskerem)
   * @returns {number} Number of days in the month
   */
  daysInMonth(year, month) {
    if (month < 0 || month > 12) {
      throw new Error("Invalid month. Ethiopian calendar has months 0-12.");
    }

    // Months 0-11 have 30 days
    if (month < 12) {
      return 30;
    }

    // Month 12 (Pagumen) has 5 days, or 6 in leap year
    return this.isLeapYear(year) ? 6 : 5;
  }

  /**
   * Convert Ethiopian calendar date to Julian Day Number
   *
   * @param {number} year - Ethiopian year
   * @param {number} month - Month (0-based)
   * @param {number} day - Day of month (1-based)
   * @param {number} hour - Hour (0-23)
   * @param {number} minute - Minute (0-59)
   * @param {number} second - Second (0-59)
   * @returns {number} Julian Day Number
   */
  convertToJulian(year, month, day, hour = 0, minute = 0, second = 0) {
    // Calculate the Julian Day number for the start of this Ethiopian year
    const yearStart = (year - 1) * 365 + Math.floor((year - 1) / 4) + this.julianDayEpoch;

    // Add days for complete months
    const daysFromMonths = month * 30;

    // Calculate the Julian Day number for this Ethiopian date
    const julianDay = yearStart + daysFromMonths + day - 1;

    // Add time component
    const timeInDays = (second + 60 * (minute + 60 * hour)) / 86400.0;

    // Return the total Julian Day number, adjusting for noon start of Julian Day
    return julianDay + timeInDays + 0.5;
  }

  /**
   * Convert Julian Day Number to Ethiopian calendar date
   *
   * @param {number} julianDayNumber - Julian Day Number
   * @returns {Array} [year, month, day] with 0-based month
   */
  convertFromJulian(julianDayNumber) {
    // Adjust to start of day
    julianDayNumber = Math.floor(julianDayNumber + 0.5);

    // Calculate the number of days since Ethiopian epoch
    const daysSinceEpoch = julianDayNumber - this.julianDayEpoch;

    // Calculate the Ethiopian year
    // Using the formula: year = floor((4 * daysSinceEpoch + 1463) / 1461)
    const year = Math.floor((4 * daysSinceEpoch + 1463) / 1461);

    // Calculate day of year (0-based)
    const yearStart = (year - 1) * 365 + Math.floor((year - 1) / 4) + this.julianDayEpoch;
    const dayOfYear = julianDayNumber - yearStart;

    // Calculate month and day
    let month, day;
    if (dayOfYear < 360) {
      // First 12 months (30 days each)
      month = Math.floor(dayOfYear / 30);
      day = dayOfYear % 30 + 1;
    } else {
      // 13th month (Pagumen)
      month = 12;
      day = dayOfYear - 360 + 1;
    }

    return [year, month, day];
  }

  /**
   * Convert from Gregorian date to Ethiopian calendar
   *
   * @param {Date} date - JavaScript Date object
   * @returns {object} {year, month, day} - Ethiopian date with 0-based month
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

    // Convert Julian Day to Ethiopian date
    const [year, month, day] = this.convertFromJulian(julianDay);

    return {
      year: year,
      month: month, // 0-based
      day: day
    };
  }

  /**
   * Convert from Ethiopian calendar to Gregorian date
   *
   * @param {number} year - Ethiopian year
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
    // Convert Ethiopian to Julian Day Number
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
   * @param {string} calendar - Calendar identifier
   * @param {string} firstMonthName - Name of first month
   * @returns {Array<string>} Array of month names
   */
  monthNames(
    locale = "en",
    calendar = "ethiopic",
    firstMonthName = "Meskerem"
  ) {
    // Try to use Intl API first
    try {
      return generateMonthNames(locale, calendar, firstMonthName);
    } catch (e) {
      // Fallback to hardcoded names if Intl API fails
      return ETHIOPIAN_MONTH_NAMES;
    }
  }

  /**
   * Get localized month name
   *
   * @param {number} monthIndex - Month index (0-12)
   * @returns {string} Month name
   */
  getLocalizedMonthName(monthIndex) {
    if (monthIndex < 0 || monthIndex > 12) {
      throw new Error("Invalid month index. Ethiopian calendar has 13 months (0-12).");
    }
    return this.monthNamesLocalized[monthIndex] || ETHIOPIAN_MONTH_NAMES[monthIndex];
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
      gregorianMonths: this.monthNames(locale, "gregory", "January"),
      months: months,
      monthsShort: months.map((month) => month.substring(0, 3)),
    };
  }
}
