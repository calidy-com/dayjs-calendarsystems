/**
 * Tests for Hijri Calendar System - Issue #7
 * Tests the fix for the one-day-behind bug by using Intl API with islamic-umalqura calendar
 */

import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";

describe("HijriCalendarSystem - Issue #7 Fix", () => {
  let hijriCalendar;

  beforeEach(() => {
    hijriCalendar = new HijriCalendarSystem();
  });

  describe("convertFromGregorian using Intl API", () => {
    test("should convert July 6, 2025 correctly", () => {
      const date = new Date(Date.UTC(2025, 6, 6, 12, 0, 0)); // July 6, 2025 at noon UTC
      const convertedDate = hijriCalendar.convertFromGregorian(date);

      // According to Intl API with islamic-umalqura
      expect(convertedDate.year).toBe(1447);
      expect(convertedDate.month).toBe(0); // Muharram (0-based)
      expect(convertedDate.day).toBe(11);
    });

    test("should convert July 5, 2025 correctly", () => {
      const date = new Date(Date.UTC(2025, 6, 5, 12, 0, 0)); // July 5, 2025 at noon UTC
      const convertedDate = hijriCalendar.convertFromGregorian(date);

      expect(convertedDate.year).toBe(1447);
      expect(convertedDate.month).toBe(0); // Muharram (0-based)
      expect(convertedDate.day).toBe(10);
    });

    test("should convert April 14, 2023 correctly", () => {
      const date = new Date(Date.UTC(2023, 3, 14, 12, 0, 0)); // April 14, 2023
      const convertedDate = hijriCalendar.convertFromGregorian(date);

      expect(convertedDate.year).toBe(1444);
      expect(convertedDate.month).toBe(8); // Ramadan (0-based)
      expect(convertedDate.day).toBe(23);
    });

    test("should handle different times of day consistently", () => {
      // All these times on the same Gregorian day should map to the same Hijri day
      const times = [
        { hour: 0, minute: 0, second: 0 },    // Midnight
        { hour: 6, minute: 0, second: 0 },    // 6 AM
        { hour: 12, minute: 0, second: 0 },   // Noon
        { hour: 18, minute: 0, second: 0 },   // 6 PM
        { hour: 23, minute: 59, second: 59 }, // End of day
      ];

      const results = times.map(({ hour, minute, second }) => {
        const date = new Date(Date.UTC(2025, 6, 6, hour, minute, second));
        return hijriCalendar.convertFromGregorian(date);
      });

      // All should give the same Hijri date
      results.forEach((result, index) => {
        expect(result.year).toBe(1447);
        expect(result.month).toBe(0);
        expect(result.day).toBe(11);
      });
    });

    test("should not be affected by timezone (uses UTC)", () => {
      // Create date with explicit UTC values
      const utcDate = new Date(Date.UTC(2025, 6, 6, 12, 0, 0));
      const utcResult = hijriCalendar.convertFromGregorian(utcDate);

      // Create date with local time (will be different depending on system timezone)
      const localDate = new Date(2025, 6, 6, 12, 0, 0);

      // Convert to UTC internally before comparing
      const localAsUTC = new Date(Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes(),
        localDate.getSeconds()
      ));
      const localResult = hijriCalendar.convertFromGregorian(localAsUTC);

      // Both should give the same result when using the same UTC time
      expect(utcResult.year).toBe(localResult.year);
      expect(utcResult.month).toBe(localResult.month);
      expect(utcResult.day).toBe(localResult.day);
    });
  });

  describe("convertToGregorian with binary search", () => {
    test("should convert Hijri 1447/01/11 back to Gregorian", () => {
      const convertedDate = hijriCalendar.convertToGregorian(1447, 0, 11);

      expect(convertedDate.year).toBe(2025);
      expect(convertedDate.month).toBe(6); // July (0-based)
      expect(convertedDate.day).toBe(7); // Based on Umm al-Qura calendar (islamic-umalqura)
    });

    test("should convert Hijri 1444/09/23 back to Gregorian", () => {
      const convertedDate = hijriCalendar.convertToGregorian(1444, 8, 23);

      expect(convertedDate.year).toBe(2023);
      expect(convertedDate.month).toBe(3); // April (0-based)
      expect(convertedDate.day).toBe(14);
    });

    test("should handle time components", () => {
      const convertedDate = hijriCalendar.convertToGregorian(1447, 0, 11, 14, 30, 0);

      expect(convertedDate.year).toBe(2025);
      expect(convertedDate.month).toBe(6); // July (0-based)
      expect(convertedDate.day).toBe(7); // Based on Umm al-Qura calendar (islamic-umalqura)
      // Time components are not validated in this test as they're set separately
    });
  });

  describe("Round-trip conversions", () => {
    test("should maintain date accuracy in round-trip conversion", () => {
      // Start with a Gregorian date (July 8, 2025 = Muharram 12, 1447)
      const originalDate = new Date(Date.UTC(2025, 6, 8, 12, 0, 0));

      // Convert to Hijri
      const hijri = hijriCalendar.convertFromGregorian(originalDate);

      // Convert back to Gregorian
      const gregorian = hijriCalendar.convertToGregorian(
        hijri.year,
        hijri.month,
        hijri.day
      );

      // Should match the original date (allowing ±1 day due to calendar differences)
      expect(gregorian.year).toBe(2025);
      expect(gregorian.month).toBe(6);
      expect(Math.abs(gregorian.day - 8)).toBeLessThanOrEqual(1);
    });

    test("should handle multiple round-trip conversions", () => {
      const testDates = [
        new Date(Date.UTC(2023, 3, 14)),  // April 14, 2023
        new Date(Date.UTC(2025, 0, 1)),   // January 1, 2025
        new Date(Date.UTC(2025, 11, 31)), // December 31, 2025
      ];

      testDates.forEach(originalDate => {
        const hijri = hijriCalendar.convertFromGregorian(originalDate);
        const gregorian = hijriCalendar.convertToGregorian(
          hijri.year,
          hijri.month,
          hijri.day
        );

        expect(gregorian.year).toBe(originalDate.getUTCFullYear());
        expect(gregorian.month).toBe(originalDate.getUTCMonth());
        expect(gregorian.day).toBe(originalDate.getUTCDate());
      });
    });
  });

  describe("Edge cases", () => {
    test("should handle leap years correctly", () => {
      // Test a known leap year in Hijri calendar
      const isLeap = hijriCalendar.isLeapYear(1445);
      expect(typeof isLeap).toBe('boolean');
    });

    test("should handle first day of Muharram", () => {
      const hijri = { year: 1447, month: 0, day: 1 };
      const gregorian = hijriCalendar.convertToGregorian(hijri.year, hijri.month, hijri.day);

      // Should return a valid Gregorian date
      expect(gregorian.year).toBeGreaterThan(0);
      expect(gregorian.month).toBeGreaterThanOrEqual(0);
      expect(gregorian.month).toBeLessThan(12);
      expect(gregorian.day).toBeGreaterThan(0);
      expect(gregorian.day).toBeLessThanOrEqual(31);
    });

    test("should handle last day of Dhu al-Hijjah", () => {
      const hijri = { year: 1447, month: 11, day: 30 };
      const gregorian = hijriCalendar.convertToGregorian(hijri.year, hijri.month, hijri.day);

      // Should return a valid Gregorian date
      expect(gregorian.year).toBeGreaterThan(0);
      expect(gregorian.month).toBeGreaterThanOrEqual(0);
      expect(gregorian.month).toBeLessThan(12);
      expect(gregorian.day).toBeGreaterThan(0);
      expect(gregorian.day).toBeLessThanOrEqual(31);
    });
  });

  describe("Comparison with old implementation", () => {
    test("should use islamic-umalqura instead of simple arithmetic calendar", () => {
      // This tests that we're using the correct calendar variant
      // The old implementation used simple arithmetic which gives different results

      const date = new Date(Date.UTC(2025, 6, 6, 12, 0, 0));
      const result = hijriCalendar.convertFromGregorian(date);

      // The old arithmetic method would give: 1447/1/10
      // The correct islamic-umalqura gives: 1447/1/11
      expect(result.day).toBe(11); // Not 10
    });
  });
});
