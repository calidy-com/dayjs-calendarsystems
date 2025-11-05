/**
 * Tests for Mars Calendar System (Darian Calendar)
 */

import MarsCalendarSystem from "../src/calendarSystems/MarsCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("MarsCalendarSystem", () => {
  let marsCalendar;

  beforeEach(() => {
    marsCalendar = new MarsCalendarSystem();
  });

  describe("Leap Year Calculations", () => {
    test("should identify odd-numbered years as leap years", () => {
      expect(marsCalendar.isLeapYear(1)).toBe(true);
      expect(marsCalendar.isLeapYear(3)).toBe(true);
      expect(marsCalendar.isLeapYear(5)).toBe(true);
      expect(marsCalendar.isLeapYear(99)).toBe(true);
    });

    test("should identify even years divisible by 10 as leap years", () => {
      expect(marsCalendar.isLeapYear(10)).toBe(true);
      expect(marsCalendar.isLeapYear(20)).toBe(true);
      expect(marsCalendar.isLeapYear(30)).toBe(true);
      expect(marsCalendar.isLeapYear(50)).toBe(true);
    });

    test("should NOT consider years divisible by 100 as leap years (unless by 500)", () => {
      expect(marsCalendar.isLeapYear(100)).toBe(false);
      expect(marsCalendar.isLeapYear(200)).toBe(false);
      expect(marsCalendar.isLeapYear(300)).toBe(false);
      expect(marsCalendar.isLeapYear(400)).toBe(false);
    });

    test("should consider years divisible by 500 as leap years", () => {
      expect(marsCalendar.isLeapYear(500)).toBe(true);
      expect(marsCalendar.isLeapYear(1000)).toBe(true);
      expect(marsCalendar.isLeapYear(1500)).toBe(true);
    });

    test("should identify even years not divisible by 10 as non-leap years", () => {
      expect(marsCalendar.isLeapYear(2)).toBe(false);
      expect(marsCalendar.isLeapYear(4)).toBe(false);
      expect(marsCalendar.isLeapYear(6)).toBe(false);
      expect(marsCalendar.isLeapYear(98)).toBe(false);
    });

    test("should return correct sols in year", () => {
      expect(marsCalendar.solsInYear(0)).toBe(668); // Even, not divisible by 10
      expect(marsCalendar.solsInYear(1)).toBe(669); // Odd
      expect(marsCalendar.solsInYear(2)).toBe(668); // Even, not divisible by 10
      expect(marsCalendar.solsInYear(10)).toBe(669); // Divisible by 10
      expect(marsCalendar.solsInYear(100)).toBe(668); // Divisible by 100, not by 500
    });
  });

  describe("Month Structure", () => {
    test("should have 24 months", () => {
      const monthNames = marsCalendar.monthNames();
      expect(monthNames.length).toBe(24);
    });

    test("should have correct month names", () => {
      const monthNames = marsCalendar.monthNames();
      expect(monthNames[0]).toBe("Sagittarius");
      expect(monthNames[1]).toBe("Dhanus");
      expect(monthNames[23]).toBe("Vrishika");
    });

    test("should have correct sols per month in non-leap year", () => {
      // Months 5, 11, 17, 23 (6th, 12th, 18th, 24th) should have 27 sols
      expect(marsCalendar.daysInMonth(0, 0)).toBe(28);  // Sagittarius
      expect(marsCalendar.daysInMonth(0, 5)).toBe(27);  // Kumbha (6th month)
      expect(marsCalendar.daysInMonth(0, 11)).toBe(27); // Rishabha (12th month)
      expect(marsCalendar.daysInMonth(0, 17)).toBe(27); // Simha (18th month)
      expect(marsCalendar.daysInMonth(0, 23)).toBe(27); // Vrishika (24th month)
    });

    test("should have 28 sols in Vrishika during leap year", () => {
      expect(marsCalendar.daysInMonth(1, 23)).toBe(28); // Year 1 is leap year
      expect(marsCalendar.daysInMonth(0, 23)).toBe(27); // Year 0 is not
    });

    test("should total 668 sols in non-leap year", () => {
      let totalSols = 0;
      for (let month = 0; month < 24; month++) {
        totalSols += marsCalendar.daysInMonth(0, month);
      }
      expect(totalSols).toBe(668);
    });

    test("should total 669 sols in leap year", () => {
      let totalSols = 0;
      for (let month = 0; month < 24; month++) {
        totalSols += marsCalendar.daysInMonth(1, month);
      }
      expect(totalSols).toBe(669);
    });
  });

  describe("Mars Sol Date (MSD) Conversions", () => {
    test("should convert epoch date correctly (MSD 0)", () => {
      // December 29, 1873 12:09 UTC should be approximately MSD 0
      const epochDate = new Date(Date.UTC(1873, 11, 29, 12, 9, 0));
      const julianDay = CalendarUtils.gregorian_to_jd(1873, 12, 29) + 0.5;
      const msd = marsCalendar.julianDayToMSD(julianDay);

      // Should be very close to 0 (within 1 sol)
      expect(Math.abs(msd)).toBeLessThan(1);
    });

    test("should convert MSD to Julian Day and back", () => {
      const testMSDs = [0, 100, 1000, 10000, 50000];

      testMSDs.forEach(msd => {
        const jd = marsCalendar.msdToJulianDay(msd);
        const msdBack = marsCalendar.julianDayToMSD(jd);
        expect(Math.abs(msdBack - msd)).toBeLessThan(0.001); // Within 0.001 sol
      });
    });

    test("should handle negative MSD (before epoch)", () => {
      const msd = -100;
      const jd = marsCalendar.msdToJulianDay(msd);
      const msdBack = marsCalendar.julianDayToMSD(jd);
      expect(Math.abs(msdBack - msd)).toBeLessThan(0.001);
    });
  });

  describe("Darian Calendar Conversions", () => {
    test("should convert MSD 0 to year 0, month 0, day 1", () => {
      const darian = marsCalendar.msdToDarian(0);
      expect(darian.year).toBe(0);
      expect(darian.month).toBe(0); // Sagittarius
      expect(darian.day).toBe(1);
    });

    test("should convert Darian date back to MSD", () => {
      const year = 10;
      const month = 5;
      const day = 15;

      const msd = marsCalendar.darianToMSD(year, month, day);
      const darian = marsCalendar.msdToDarian(msd);

      expect(darian.year).toBe(year);
      expect(darian.month).toBe(month);
      expect(darian.day).toBe(day);
    });

    test("should handle first day of each month", () => {
      for (let month = 0; month < 24; month++) {
        const msd = marsCalendar.darianToMSD(1, month, 1);
        const darian = marsCalendar.msdToDarian(msd);
        expect(darian.year).toBe(1);
        expect(darian.month).toBe(month);
        expect(darian.day).toBe(1);
      }
    });

    test("should handle last day of each month in non-leap year", () => {
      for (let month = 0; month < 24; month++) {
        const lastDay = marsCalendar.daysInMonth(0, month);
        const msd = marsCalendar.darianToMSD(0, month, lastDay);
        const darian = marsCalendar.msdToDarian(msd);
        expect(darian.year).toBe(0);
        expect(darian.month).toBe(month);
        expect(darian.day).toBe(lastDay);
      }
    });

    test("should correctly handle leap year calculations in MSD", () => {
      // Last day of year 0 (non-leap)
      const msd0 = marsCalendar.darianToMSD(0, 23, 27);
      expect(Math.floor(msd0)).toBe(667); // 668 sols total, 0-indexed

      // Last day of year 1 (leap year)
      const msd1 = marsCalendar.darianToMSD(1, 23, 28);
      const expectedMSD1 = 668 + 668; // Year 0 + Year 1
      expect(Math.floor(msd1)).toBe(expectedMSD1);
    });
  });

  describe("Gregorian to Mars Conversion", () => {
    test("should convert current date to Mars date", () => {
      const earthDate = new Date();
      const marsDate = marsCalendar.convertFromGregorian(earthDate);

      expect(marsDate.year).toBeGreaterThanOrEqual(0);
      expect(marsDate.month).toBeGreaterThanOrEqual(0);
      expect(marsDate.month).toBeLessThan(24);
      expect(marsDate.day).toBeGreaterThan(0);
      expect(marsDate.day).toBeLessThanOrEqual(28);
    });

    test("should convert January 1, 2000 to Mars date", () => {
      const earthDate = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));
      const marsDate = marsCalendar.convertFromGregorian(earthDate);

      // This should be around Mars year 105-106
      expect(marsDate.year).toBeGreaterThan(100);
      expect(marsDate.year).toBeLessThan(110);
      expect(marsDate.month).toBeGreaterThanOrEqual(0);
      expect(marsDate.month).toBeLessThan(24);
    });

    test("should convert January 1, 2024 to Mars date", () => {
      const earthDate = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
      const marsDate = marsCalendar.convertFromGregorian(earthDate);

      // This should be around Mars year 118-119
      expect(marsDate.year).toBeGreaterThan(115);
      expect(marsDate.year).toBeLessThan(120);
    });
  });

  describe("Mars to Gregorian Conversion", () => {
    test("should convert Mars year 0, sol 1 to Gregorian", () => {
      const gregorian = marsCalendar.convertToGregorian(0, 0, 1);

      // Should be close to December 29, 1873
      expect(gregorian.year).toBe(1873);
      expect(gregorian.month).toBe(11); // December (0-based)
      expect(gregorian.day).toBeGreaterThanOrEqual(28);
      expect(gregorian.day).toBeLessThanOrEqual(30);
    });

    test("should convert Mars year 100, month 0, day 1 to Gregorian", () => {
      const gregorian = marsCalendar.convertToGregorian(100, 0, 1);

      expect(gregorian.year).toBeGreaterThan(1870);
      expect(gregorian.year).toBeLessThan(2100);
      expect(gregorian.month).toBeGreaterThanOrEqual(0);
      expect(gregorian.month).toBeLessThan(12);
    });
  });

  describe("Round-trip Conversions", () => {
    test("should maintain accuracy in Gregorian -> Mars -> Gregorian", () => {
      const testDates = [
        new Date(Date.UTC(2000, 0, 1)),
        new Date(Date.UTC(2020, 6, 15)),
        new Date(Date.UTC(2024, 0, 1)),
        new Date(Date.UTC(1900, 11, 31)),
      ];

      testDates.forEach(originalDate => {
        const marsDate = marsCalendar.convertFromGregorian(originalDate);
        const backToGregorian = marsCalendar.convertToGregorian(
          marsDate.year,
          marsDate.month,
          marsDate.day
        );

        // Should match within 1-2 days (due to rounding)
        expect(Math.abs(backToGregorian.year - originalDate.getUTCFullYear())).toBeLessThanOrEqual(1);
        const monthDiff = Math.abs(backToGregorian.month - originalDate.getUTCMonth());
        expect(monthDiff).toBeLessThanOrEqual(1);
      });
    });

    test("should maintain accuracy in Mars -> Gregorian -> Mars", () => {
      const testMARSDates = [
        { year: 0, month: 0, day: 1 },
        { year: 1, month: 5, day: 15 },
        { year: 100, month: 12, day: 20 },
        { year: 50, month: 23, day: 27 },
      ];

      testMARSDates.forEach(originalMars => {
        const gregorian = marsCalendar.convertToGregorian(
          originalMars.year,
          originalMars.month,
          originalMars.day
        );

        const gregorianDate = new Date(Date.UTC(
          gregorian.year,
          gregorian.month,
          gregorian.day
        ));

        const backToMars = marsCalendar.convertFromGregorian(gregorianDate);

        expect(backToMars.year).toBe(originalMars.year);
        expect(backToMars.month).toBe(originalMars.month);
        expect(Math.abs(backToMars.day - originalMars.day)).toBeLessThanOrEqual(1);
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle year 0", () => {
      const marsDate = { year: 0, month: 0, day: 1 };
      const gregorian = marsCalendar.convertToGregorian(
        marsDate.year,
        marsDate.month,
        marsDate.day
      );
      expect(gregorian.year).toBe(1873);
    });

    test("should handle negative MSD correctly", () => {
      const darian = marsCalendar.msdToDarian(-1);
      expect(darian.year).toBe(-1);
    });

    test("should handle leap year boundary (Vrishika 27 vs 28)", () => {
      // Non-leap year: Vrishika should have 27 sols
      const msd0 = marsCalendar.darianToMSD(0, 23, 27);
      const darian0 = marsCalendar.msdToDarian(msd0);
      expect(darian0.month).toBe(23);
      expect(darian0.day).toBe(27);

      // Leap year: Vrishika should have 28 sols
      const msd1 = marsCalendar.darianToMSD(1, 23, 28);
      const darian1 = marsCalendar.msdToDarian(msd1);
      expect(darian1.month).toBe(23);
      expect(darian1.day).toBe(28);
    });

    test("should get localized month name", () => {
      expect(marsCalendar.getLocalizedMonthName(0)).toBe("Sagittarius");
      expect(marsCalendar.getLocalizedMonthName(23)).toBe("Vrishika");
    });

    test("should throw error for invalid month index", () => {
      expect(() => marsCalendar.getLocalizedMonthName(-1)).toThrow();
      expect(() => marsCalendar.getLocalizedMonthName(24)).toThrow();
    });
  });

  describe("Julian Day Conversions", () => {
    test("should convert Mars date to Julian Day", () => {
      const jd = marsCalendar.convertToJulian(0, 0, 1);
      expect(jd).toBeGreaterThan(2400000);
      expect(jd).toBeLessThan(2500000);
    });

    test("should maintain consistency with Gregorian conversion", () => {
      const marsDate = { year: 50, month: 10, day: 15 };

      // Convert via Julian Day
      const jd = marsCalendar.convertToJulian(
        marsDate.year,
        marsDate.month,
        marsDate.day
      );
      const gregorianViaJD = CalendarUtils.jd_to_gregorian(jd);

      // Convert directly
      const gregorianDirect = marsCalendar.convertToGregorian(
        marsDate.year,
        marsDate.month,
        marsDate.day
      );

      expect(gregorianViaJD[0]).toBe(gregorianDirect.year);
      expect(gregorianViaJD[1] - 1).toBe(gregorianDirect.month);
      expect(Math.abs(gregorianViaJD[2] - gregorianDirect.day)).toBeLessThanOrEqual(1);
    });
  });

  describe("Locale Override", () => {
    test("should provide Mars-specific weekday names", () => {
      const localeConfig = marsCalendar.localeOverride("en");
      expect(localeConfig.weekdays).toHaveLength(7);
      expect(localeConfig.weekdays[0]).toBe("Sol Solis");
      expect(localeConfig.weekdays[2]).toBe("Sol Martis"); // Mars day!
    });

    test("should provide month names in locale override", () => {
      const localeConfig = marsCalendar.localeOverride("en");
      expect(localeConfig.months).toHaveLength(24);
      expect(localeConfig.months[0]).toBe("Sagittarius");
    });
  });
});
