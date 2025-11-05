/**
 * Mars Calendar System (Darian Calendar)
 *
 * @file MarsCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description Implementation of the Darian Calendar for Mars
 *
 * The Darian calendar is a proposed timekeeping system for Mars, created by
 * aerospace engineer Thomas Gangale in 1985. It's based on the Martian sol
 * (solar day) and the Martian vernal equinox year.
 *
 * Key Facts:
 * - 1 sol (Martian day) = 24h 39m 35.244s Earth time = 88,775.244 seconds
 * - 1 Mars year = 668.5907 sols = 686.9711 Earth days
 * - 24 months per year, alternating Latin/Sanskrit zodiac constellation names
 * - Most months have 28 sols, four months have 27 sols (or 28 in leap year)
 * - Epoch: December 29, 1873 at 12:09 UTC (Martian year 0, sol 0)
 *
 * References:
 * - https://en.wikipedia.org/wiki/Darian_calendar
 * - https://en.wikipedia.org/wiki/Timekeeping_on_Mars
 * - Gangale, T. (2006). "The Architecture of Time, Part 2: The Darian System for Mars"
 */

import CalendarSystemBase from "./CalendarSystemBase";
import * as CalendarUtils from "../calendarUtils/fourmilabCalendar";

// Constants for Mars timekeeping
const SECONDS_PER_SOL = 88775.244; // 24h 39m 35.244s
const EARTH_DAYS_PER_SOL = 1.0274912517;
const SOLS_PER_MARS_YEAR = 668.5907;
const EARTH_DAYS_PER_MARS_YEAR = 686.9711;

// Mars Sol Date (MSD) epoch: December 29, 1873 12:09 UTC
// This corresponds to JD 2405522.0 in Terrestrial Time
const MSD_EPOCH_JD = 2405522.0;

// Alternative epoch for MSD calculation (used in NASA's formula)
const MSD_JULIAN_OFFSET = 2451549.5;
const MSD_BASE_OFFSET = 44796.0;
const MSD_CORRECTION = 0.0009626;

// Month definitions for the Darian calendar
// Alternates between Latin and Sanskrit names of zodiac constellations
const MONTH_NAMES_LATIN = [
  "Sagittarius", "Dhanus",
  "Capricornus", "Makara",
  "Aquarius", "Kumbha",
  "Pisces", "Mina",
  "Aries", "Mesha",
  "Taurus", "Rishabha",
  "Gemini", "Mithuna",
  "Cancer", "Karka",
  "Leo", "Simha",
  "Virgo", "Kanya",
  "Libra", "Tula",
  "Scorpius", "Vrishika"
];

// Number of sols in each month (0-indexed)
// Months 5, 11, 17, 23 (6th, 12th, 18th, 24th) have 27 sols
// Month 23 (Vrishika) has 28 sols in leap years
const SOLS_PER_MONTH = [
  28, 28, 28, 28, 28, 27, // Sagittarius through Kumbha
  28, 28, 28, 28, 28, 27, // Pisces through Rishabha
  28, 28, 28, 28, 28, 27, // Gemini through Simha
  28, 28, 28, 28, 28, 27  // Virgo through Vrishika
];

export default class MarsCalendarSystem extends CalendarSystemBase {
  constructor(locale = "en") {
    super();
    this.firstDayOfWeek = 0; // Mars week starts on Sol Solis (Sunday equivalent)
    this.locale = locale;
    this.intlCalendar = "gregory"; // No Intl support for Mars calendar yet
    this.firstMonthNameEnglish = "Sagittarius";
    this.monthNamesLocalized = MONTH_NAMES_LATIN;
    this.solsPerMonth = SOLS_PER_MONTH;
  }

  /**
   * Calculate Mars Sol Date (MSD) from Julian Day
   * MSD is the number of sols since the epoch
   *
   * Formula: MSD = (JD − 2451549.5) / 1.0274912517 + 44796.0 − 0.0009626
   *
   * @param {number} julianDay - Julian Day Number
   * @returns {number} Mars Sol Date
   */
  julianDayToMSD(julianDay) {
    return (julianDay - MSD_JULIAN_OFFSET) / EARTH_DAYS_PER_SOL + MSD_BASE_OFFSET - MSD_CORRECTION;
  }

  /**
   * Calculate Julian Day from Mars Sol Date
   *
   * @param {number} msd - Mars Sol Date
   * @returns {number} Julian Day Number
   */
  msdToJulianDay(msd) {
    return (msd - MSD_BASE_OFFSET + MSD_CORRECTION) * EARTH_DAYS_PER_SOL + MSD_JULIAN_OFFSET;
  }

  /**
   * Determine if a Mars year is a leap year
   *
   * Leap year rules:
   * - Odd-numbered years are leap years
   * - OR years divisible by 10 are leap years
   * - EXCEPT years divisible by 100 (unless also divisible by 500)
   *
   * @param {number} year - Mars year (0-based from epoch)
   * @returns {boolean} True if leap year
   */
  isLeapYear(year = null) {
    if (year === null) {
      year = this.$y;
    }

    // Year 0 and negative years handling
    if (year < 0) {
      return false; // Before epoch, no leap years defined
    }

    // Check exception: divisible by 100 but not 500
    if (year % 100 === 0 && year % 500 !== 0) {
      return false;
    }

    // Odd-numbered years OR divisible by 10
    return (year % 2 === 1) || (year % 10 === 0);
  }

  /**
   * Get the number of sols in a Mars year
   *
   * @param {number} year - Mars year
   * @returns {number} Number of sols (668 or 669)
   */
  solsInYear(year) {
    return this.isLeapYear(year) ? 669 : 668;
  }

  /**
   * Get the number of sols in a specific month
   *
   * @param {number} year - Mars year
   * @param {number} month - Month (0-based, 0 = Sagittarius)
   * @returns {number} Number of sols in the month
   */
  daysInMonth(year, month) {
    // Vrishika (month 23, index 23) has 28 sols in leap years
    if (month === 23 && this.isLeapYear(year)) {
      return 28;
    }
    return SOLS_PER_MONTH[month];
  }

  /**
   * Convert Mars Sol Date to Darian calendar date
   *
   * @param {number} msd - Mars Sol Date
   * @returns {object} {year, month, day} - 0-based month
   */
  msdToDarian(msd) {
    // Handle negative MSD (before epoch)
    if (msd < 0) {
      return { year: -1, month: 0, day: 1 };
    }

    // Calculate the year
    let year = 0;
    let remainingSols = Math.floor(msd);

    // Estimate the year (approximate)
    year = Math.floor(remainingSols / 668.5907);

    // Count exact sols from year 0 to estimated year
    let solsInPreviousYears = 0;
    for (let y = 0; y < year; y++) {
      solsInPreviousYears += this.solsInYear(y);
    }

    // Adjust if we overshot
    while (solsInPreviousYears > remainingSols) {
      year--;
      solsInPreviousYears -= this.solsInYear(year);
    }

    // Calculate remaining sols in current year
    const solsInCurrentYear = remainingSols - solsInPreviousYears;

    // Find month and day
    let month = 0;
    let dayOfMonth = solsInCurrentYear + 1; // 1-based day

    let solsInPreviousMonths = 0;
    for (let m = 0; m < 24; m++) {
      const solsInThisMonth = this.daysInMonth(year, m);
      if (solsInPreviousMonths + solsInThisMonth > solsInCurrentYear) {
        month = m;
        dayOfMonth = solsInCurrentYear - solsInPreviousMonths + 1;
        break;
      }
      solsInPreviousMonths += solsInThisMonth;
    }

    return {
      year: year,
      month: month, // 0-based
      day: Math.floor(dayOfMonth)
    };
  }

  /**
   * Convert Darian calendar date to Mars Sol Date
   *
   * @param {number} year - Mars year (0-based from epoch)
   * @param {number} month - Month (0-based)
   * @param {number} day - Day of month (1-based)
   * @returns {number} Mars Sol Date
   */
  darianToMSD(year, month, day) {
    let msd = 0;

    // Add sols from all previous years
    for (let y = 0; y < year; y++) {
      msd += this.solsInYear(y);
    }

    // Add sols from previous months in current year
    for (let m = 0; m < month; m++) {
      msd += this.daysInMonth(year, m);
    }

    // Add days in current month (subtract 1 because day is 1-based)
    msd += day - 1;

    return msd;
  }

  /**
   * Convert from Gregorian date to Mars Darian calendar
   *
   * @param {Date} date - JavaScript Date object
   * @returns {object} {year, month, day} - Mars calendar date
   */
  convertFromGregorian(date) {
    date = this.validateDate(date);

    // Convert to Julian Day
    const julianDay = CalendarUtils.gregorian_to_jd(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ) +
    Math.floor(
      date.getSeconds() +
        60 * (date.getMinutes() + 60 * date.getHours()) +
        0.5
    ) / 86400.0 - 0.5;

    // Convert Julian Day to Mars Sol Date
    const msd = this.julianDayToMSD(julianDay);

    // Convert MSD to Darian calendar
    return this.msdToDarian(msd);
  }

  /**
   * Convert from Mars Darian calendar to Gregorian date
   *
   * @param {number} year - Mars year
   * @param {number} month - Month (0-based)
   * @param {number} day - Day of month (1-based)
   * @param {number} hour - Hour (0-23)
   * @param {number} minute - Minute (0-59)
   * @param {number} second - Second (0-59)
   * @param {number} millisecond - Millisecond (0-999)
   * @returns {object} {year, month, day} - Gregorian date
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
    // Convert Darian date to MSD
    const msd = this.darianToMSD(year, month, day);

    // Add time component (fraction of sol)
    const timeInSeconds = second + 60 * (minute + 60 * hour);
    const fractionalSol = timeInSeconds / SECONDS_PER_SOL;

    // Convert MSD to Julian Day
    const julianDay = this.msdToJulianDay(msd + fractionalSol);

    // Convert Julian Day to Gregorian
    const gregorianArray = CalendarUtils.jd_to_gregorian(julianDay);

    return {
      year: gregorianArray[0],
      month: gregorianArray[1] - 1, // Convert to 0-based
      day: gregorianArray[2]
    };
  }

  /**
   * Convert Mars date to Julian Day
   *
   * @param {number} year - Mars year
   * @param {number} month - Month (0-based)
   * @param {number} day - Day of month (1-based)
   * @param {number} hour - Hour
   * @param {number} minute - Minute
   * @param {number} second - Second
   * @returns {number} Julian Day Number
   */
  convertToJulian(year, month, day, hour = 0, minute = 0, second = 0) {
    const msd = this.darianToMSD(year, month, day);
    const timeInSeconds = second + 60 * (minute + 60 * hour);
    const fractionalSol = timeInSeconds / SECONDS_PER_SOL;
    return this.msdToJulianDay(msd + fractionalSol);
  }

  /**
   * Get month names
   *
   * @returns {Array<string>} Array of month names
   */
  monthNames() {
    return MONTH_NAMES_LATIN;
  }

  /**
   * Get localized month name
   *
   * @param {number} monthIndex - Month index (0-based)
   * @returns {string} Month name
   */
  getLocalizedMonthName(monthIndex) {
    if (monthIndex < 0 || monthIndex >= 24) {
      throw new Error("Invalid month index. Mars has 24 months (0-23).");
    }
    return this.monthNamesLocalized[monthIndex];
  }

  /**
   * Get locale override for dayjs
   *
   * @param {string} locale - Locale code
   * @returns {object} Locale configuration object
   */
  localeOverride(locale) {
    return {
      gregorianMonths: this.monthNames(),
      months: this.monthNames(),
      monthsShort: this.monthNames().map((month) => month.substring(0, 4)),
      weekdays: [
        "Sol Solis",    // Sunday equivalent
        "Sol Lunae",    // Monday equivalent
        "Sol Martis",   // Tuesday equivalent (Mars day!)
        "Sol Mercurii", // Wednesday equivalent
        "Sol Jovis",    // Thursday equivalent
        "Sol Veneris",  // Friday equivalent
        "Sol Saturni"   // Saturday equivalent
      ],
      weekdaysShort: ["Sol", "Lun", "Mar", "Mer", "Jov", "Ven", "Sat"],
      weekdaysMin: ["So", "Lu", "Ma", "Me", "Jo", "Ve", "Sa"]
    };
  }
}
