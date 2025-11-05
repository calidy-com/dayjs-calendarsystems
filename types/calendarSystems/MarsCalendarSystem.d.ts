/**
 * Mars Calendar System (Darian Calendar) Type Definitions
 *
 * @file MarsCalendarSystem.d.ts
 * @project dayjs-calendarsystems
 */

import CalendarSystemBase from './CalendarSystemBase';

/**
 * Mars Calendar System implementing the Darian calendar
 *
 * The Darian calendar is a proposed timekeeping system for Mars based on
 * the Martian sol (solar day) and vernal equinox year.
 *
 * Features:
 * - 24 months per year (alternating Latin/Sanskrit zodiac names)
 * - 668 or 669 sols per year
 * - Epoch: December 29, 1873
 *
 * @example
 * ```typescript
 * import dayjs from 'dayjs';
 * import calendarSystems from '@calidy/dayjs-calendarsystems';
 * import MarsCalendarSystem from '@calidy/dayjs-calendarsystems/calendarSystems/MarsCalendarSystem';
 *
 * dayjs.extend(calendarSystems);
 * dayjs.registerCalendarSystem('mars', new MarsCalendarSystem());
 *
 * const marsDate = dayjs().toCalendarSystem('mars');
 * console.log(marsDate.format('YYYY-MM-DD')); // e.g., "0224-15-18"
 * ```
 */
export default class MarsCalendarSystem extends CalendarSystemBase {
  /**
   * Array of sols per month (0-indexed)
   * Most months have 28 sols, four months have 27 sols
   */
  solsPerMonth: number[];

  /**
   * Create a new Mars Calendar System
   * @param locale - Locale code (default: "en")
   */
  constructor(locale?: string);

  /**
   * Convert Julian Day to Mars Sol Date (MSD)
   *
   * MSD is the number of sols since the Mars epoch (Dec 29, 1873)
   *
   * @param julianDay - Julian Day Number
   * @returns Mars Sol Date
   */
  julianDayToMSD(julianDay: number): number;

  /**
   * Convert Mars Sol Date to Julian Day
   *
   * @param msd - Mars Sol Date
   * @returns Julian Day Number
   */
  msdToJulianDay(msd: number): number;

  /**
   * Determine if a Mars year is a leap year
   *
   * Leap year rules:
   * - Odd-numbered years are leap years
   * - Years divisible by 10 are leap years
   * - EXCEPT years divisible by 100 (unless also divisible by 500)
   *
   * @param year - Mars year (null to use current instance year)
   * @returns True if leap year
   */
  isLeapYear(year?: number | null): boolean;

  /**
   * Get the number of sols in a Mars year
   *
   * @param year - Mars year
   * @returns Number of sols (668 or 669)
   */
  solsInYear(year: number): number;

  /**
   * Get the number of sols in a specific month
   *
   * @param year - Mars year
   * @param month - Month (0-based, 0 = Sagittarius)
   * @returns Number of sols in the month (27 or 28)
   */
  daysInMonth(year: number, month: number): number;

  /**
   * Convert Mars Sol Date to Darian calendar date
   *
   * @param msd - Mars Sol Date
   * @returns Darian calendar date with 0-based month
   */
  msdToDarian(msd: number): {
    year: number;
    month: number;
    day: number;
  };

  /**
   * Convert Darian calendar date to Mars Sol Date
   *
   * @param year - Mars year (0-based from epoch)
   * @param month - Month (0-based, 0 = Sagittarius)
   * @param day - Day of month (1-based)
   * @returns Mars Sol Date
   */
  darianToMSD(year: number, month: number, day: number): number;

  /**
   * Convert from Gregorian date to Mars Darian calendar
   *
   * @param date - JavaScript Date object or compatible value
   * @returns Mars calendar date with 0-based month
   */
  convertFromGregorian(date: Date | string | number): {
    year: number;
    month: number;
    day: number;
  };

  /**
   * Convert from Mars Darian calendar to Gregorian date
   *
   * @param year - Mars year
   * @param month - Month (0-based)
   * @param day - Day of month (1-based)
   * @param hour - Hour (0-23, default: 0)
   * @param minute - Minute (0-59, default: 0)
   * @param second - Second (0-59, default: 0)
   * @param millisecond - Millisecond (0-999, default: 0)
   * @returns Gregorian date with 0-based month
   */
  convertToGregorian(
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number
  ): {
    year: number;
    month: number;
    day: number;
  };

  /**
   * Convert Mars date to Julian Day
   *
   * @param year - Mars year
   * @param month - Month (0-based)
   * @param day - Day of month (1-based)
   * @param hour - Hour (default: 0)
   * @param minute - Minute (default: 0)
   * @param second - Second (default: 0)
   * @returns Julian Day Number
   */
  convertToJulian(
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number
  ): number;

  /**
   * Get array of all month names
   *
   * Returns 24 month names alternating between Latin and Sanskrit
   * names of zodiac constellations
   *
   * @returns Array of month names
   */
  monthNames(): string[];

  /**
   * Get localized month name for a specific month
   *
   * @param monthIndex - Month index (0-23)
   * @returns Month name
   * @throws Error if monthIndex is out of range
   */
  getLocalizedMonthName(monthIndex: number): string;

  /**
   * Get locale override configuration for dayjs
   *
   * @param locale - Locale code
   * @returns Locale configuration object with Mars-specific settings
   */
  localeOverride(locale: string): {
    gregorianMonths: string[];
    months: string[];
    monthsShort: string[];
    weekdays: string[];
    weekdaysShort: string[];
    weekdaysMin: string[];
  };
}
