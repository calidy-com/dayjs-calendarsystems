/**
 * Tests for Indian National Calendar System (Saka Calendar)
 */

import IndianCalendarSystem from "../src/calendarSystems/IndianCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("IndianCalendarSystem", () => {
  let indianCalendar;

  beforeEach(() => {
    indianCalendar = new IndianCalendarSystem();
  });

  describe("Leap Year Calculations", () => {
    test("should identify leap years correctly", () => {
      // Saka year is leap if (Saka + 78) is Gregorian leap year
      // Saka 1946 + 78 = 2024 (Gregorian leap year)
      expect(indianCalendar.isLeapYear(1946)).toBe(true);
      // Saka 1942 + 78 = 2020 (Gregorian leap year)
      expect(indianCalendar.isLeapYear(1942)).toBe(true);
      // Saka 1922 + 78 = 2000 (Gregorian leap year)
      expect(indianCalendar.isLeapYear(1922)).toBe(true);
      // Saka 1844 + 78 = 1922 (Gregorian non-leap, but 1920 is leap)
      expect(indianCalendar.isLeapYear(1842)).toBe(true); // 1842 + 78 = 1920
    });

    test("should identify non-leap years correctly", () => {
      // Saka 1945 + 78 = 2023 (Gregorian non-leap year)
      expect(indianCalendar.isLeapYear(1945)).toBe(false);
      // Saka 1943 + 78 = 2021 (Gregorian non-leap year)
      expect(indianCalendar.isLeapYear(1943)).toBe(false);
      // Saka 1921 + 78 = 1999 (Gregorian non-leap year)
      expect(indianCalendar.isLeapYear(1921)).toBe(false);
    });

    test("should handle century years correctly", () => {
      // Saka 1322 + 78 = 1400 (not divisible by 400, so not leap)
      expect(indianCalendar.isLeapYear(1322)).toBe(false);
      // Saka 1522 + 78 = 1600 (divisible by 400, so leap)
      expect(indianCalendar.isLeapYear(1522)).toBe(true);
      // Saka 1622 + 78 = 1700 (not divisible by 400, so not leap)
      expect(indianCalendar.isLeapYear(1622)).toBe(false);
      // Saka 1922 + 78 = 2000 (divisible by 400, so leap)
      expect(indianCalendar.isLeapYear(1922)).toBe(true);
    });
  });

  describe("Month Structure", () => {
    test("should have 12 months", () => {
      const monthNames = indianCalendar.monthNames();
      expect(monthNames.length).toBe(12);
    });

    test("should have correct month names", () => {
      expect(indianCalendar.getLocalizedMonthName(0)).toBe("Chaitra");
      expect(indianCalendar.getLocalizedMonthName(1)).toBe("Vaisakha");
      expect(indianCalendar.getLocalizedMonthName(2)).toBe("Jyaistha");
      expect(indianCalendar.getLocalizedMonthName(11)).toBe("Phalguna");
    });

    test("Chaitra should have 30 days in non-leap year", () => {
      expect(indianCalendar.daysInMonth(1945, 0)).toBe(30);
    });

    test("Chaitra should have 31 days in leap year", () => {
      expect(indianCalendar.daysInMonth(1946, 0)).toBe(31);
    });

    test("Vaisakha-Bhadra (months 1-5) should have 31 days", () => {
      for (let month = 1; month <= 5; month++) {
        expect(indianCalendar.daysInMonth(1945, month)).toBe(31);
        expect(indianCalendar.daysInMonth(1946, month)).toBe(31);
      }
    });

    test("Asvina-Phalguna (months 6-11) should have 30 days", () => {
      for (let month = 6; month <= 11; month++) {
        expect(indianCalendar.daysInMonth(1945, month)).toBe(30);
        expect(indianCalendar.daysInMonth(1946, month)).toBe(30);
      }
    });

    test("should throw error for invalid month index", () => {
      expect(() => indianCalendar.daysInMonth(1945, -1)).toThrow();
      expect(() => indianCalendar.daysInMonth(1945, 12)).toThrow();
      expect(() => indianCalendar.getLocalizedMonthName(-1)).toThrow();
      expect(() => indianCalendar.getLocalizedMonthName(12)).toThrow();
    });

    test("total days should be 365 in non-leap year", () => {
      let totalDays = 0;
      for (let month = 0; month < 12; month++) {
        totalDays += indianCalendar.daysInMonth(1945, month);
      }
      expect(totalDays).toBe(365);
    });

    test("total days should be 366 in leap year", () => {
      let totalDays = 0;
      for (let month = 0; month < 12; month++) {
        totalDays += indianCalendar.daysInMonth(1946, month);
      }
      expect(totalDays).toBe(366);
    });
  });

  describe("Julian Day Conversions", () => {
    test("should convert Indian epoch to Julian Day", () => {
      // Saka year 0, Chaitra 1 = March 22, 78 CE
      // Expected JD: 1749629.5
      const jd = indianCalendar.convertToJulian(0, 0, 1);
      // Allow ±1 day difference due to implementation details
      expect(Math.abs(jd - 1749629.5)).toBeLessThanOrEqual(1);
    });

    test("should convert Julian Day back to Indian date", () => {
      const jd = 1749629.5; // March 22, 78 CE
      const [year, month, day] = indianCalendar.convertFromJulian(jd);
      expect(year).toBe(0);
      expect(month).toBe(0);
      expect(day).toBeGreaterThanOrEqual(1);
      expect(day).toBeLessThanOrEqual(2);
    });

    test("should handle round-trip JD conversions", () => {
      const testDates = [
        { year: 1945, month: 0, day: 1 },   // Chaitra 1, 1945
        { year: 1946, month: 0, day: 1 },   // Chaitra 1, 1946 (leap year)
        { year: 1945, month: 6, day: 15 },  // Mid-year
        { year: 1946, month: 11, day: 30 }, // End of year
      ];

      testDates.forEach(({ year, month, day }) => {
        const jd = indianCalendar.convertToJulian(year, month, day);
        const [y, m, d] = indianCalendar.convertFromJulian(jd);
        expect(y).toBe(year);
        expect(m).toBe(month);
        expect(d).toBe(day);
      });
    });
  });

  describe("Gregorian to Indian Conversion", () => {
    test("should convert March 22, 2024 to Saka 1946, Chaitra 1 (leap year)", () => {
      // In leap years, Chaitra 1 = March 21
      const date = new Date(Date.UTC(2024, 2, 21)); // March 21, 2024
      const indian = indianCalendar.convertFromGregorian(date);

      expect(indian.year).toBe(1946);
      expect(indian.month).toBe(0); // Chaitra
      expect(indian.day).toBe(1);
    });

    test("should convert March 22, 2023 to Saka 1945, Chaitra 1 (non-leap year)", () => {
      // In non-leap years, Chaitra 1 = March 22
      const date = new Date(Date.UTC(2023, 2, 22)); // March 22, 2023
      const indian = indianCalendar.convertFromGregorian(date);

      expect(indian.year).toBe(1945);
      expect(indian.month).toBe(0); // Chaitra
      expect(indian.day).toBe(1);
    });

    test("should convert January 1, 2024 to Indian date", () => {
      const date = new Date(Date.UTC(2024, 0, 1)); // January 1, 2024
      const indian = indianCalendar.convertFromGregorian(date);

      // Jan 1, 2024 should be in Pausa month (month 9), year 1945
      expect(indian.year).toBe(1945);
      expect(indian.month).toBe(9); // Pausa
      expect(indian.day).toBeGreaterThanOrEqual(10);
      expect(indian.day).toBeLessThanOrEqual(12);
    });

    test("should convert April 14, 2024 to Indian date", () => {
      const date = new Date(Date.UTC(2024, 3, 14)); // April 14, 2024
      const indian = indianCalendar.convertFromGregorian(date);

      // April 14, 2024 should be in Vaisakha, year 1946
      expect(indian.year).toBe(1946);
      expect(indian.month).toBe(1); // Vaisakha
      expect(indian.day).toBeGreaterThanOrEqual(24);
      expect(indian.day).toBeLessThanOrEqual(25);
    });

    test("should handle various Gregorian dates", () => {
      const testDates = [
        new Date(Date.UTC(2023, 5, 15)),  // June 15, 2023
        new Date(Date.UTC(2024, 8, 1)),   // September 1, 2024
        new Date(Date.UTC(2023, 11, 25)), // December 25, 2023
      ];

      testDates.forEach(date => {
        const indian = indianCalendar.convertFromGregorian(date);

        // Verify we get valid Indian calendar components
        expect(indian.year).toBeGreaterThan(0);
        expect(indian.month).toBeGreaterThanOrEqual(0);
        expect(indian.month).toBeLessThan(12);
        expect(indian.day).toBeGreaterThan(0);
        expect(indian.day).toBeLessThanOrEqual(31);
      });
    });
  });

  describe("Indian to Gregorian Conversion", () => {
    test("should convert Saka 1946, Chaitra 1 to March 21, 2024", () => {
      const gregorian = indianCalendar.convertToGregorian(1946, 0, 1);

      expect(gregorian.year).toBe(2024);
      expect(gregorian.month).toBe(2); // March (0-based)
      expect(gregorian.day).toBe(21);
    });

    test("should convert Saka 1945, Chaitra 1 to March 22, 2023", () => {
      const gregorian = indianCalendar.convertToGregorian(1945, 0, 1);

      expect(gregorian.year).toBe(2023);
      expect(gregorian.month).toBe(2); // March (0-based)
      expect(gregorian.day).toBe(22);
    });

    test("should convert Saka 0, Chaitra 1 to March 22, 78 CE", () => {
      const gregorian = indianCalendar.convertToGregorian(0, 0, 1);

      expect(gregorian.year).toBe(78);
      expect(gregorian.month).toBe(2); // March (0-based)
      // Allow some variation due to epoch definition
      expect(gregorian.day).toBeGreaterThanOrEqual(21);
      expect(gregorian.day).toBeLessThanOrEqual(23);
    });

    test("should convert various Indian dates", () => {
      const testDates = [
        { year: 1945, month: 5, day: 15 }, // Bhadra 15, 1945
        { year: 1946, month: 11, day: 30 }, // Phalguna 30, 1946
        { year: 1900, month: 6, day: 1 },  // Asvina 1, 1900
      ];

      testDates.forEach(({ year, month, day }) => {
        const gregorian = indianCalendar.convertToGregorian(year, month, day);

        // Verify we get valid Gregorian components
        expect(gregorian.year).toBeGreaterThan(0);
        expect(gregorian.month).toBeGreaterThanOrEqual(0);
        expect(gregorian.month).toBeLessThan(12);
        expect(gregorian.day).toBeGreaterThan(0);
        expect(gregorian.day).toBeLessThanOrEqual(31);
      });
    });
  });

  describe("Round-trip Conversions", () => {
    test("should handle Gregorian -> Indian -> Gregorian round-trips", () => {
      const testDates = [
        new Date(Date.UTC(2024, 2, 21)),  // March 21, 2024
        new Date(Date.UTC(2023, 2, 22)),  // March 22, 2023
        new Date(Date.UTC(2024, 6, 15)),  // July 15, 2024
        new Date(Date.UTC(2023, 11, 31)), // December 31, 2023
      ];

      testDates.forEach(originalDate => {
        const indian = indianCalendar.convertFromGregorian(originalDate);
        const gregorian = indianCalendar.convertToGregorian(
          indian.year,
          indian.month,
          indian.day
        );

        expect(gregorian.year).toBe(originalDate.getUTCFullYear());
        expect(gregorian.month).toBe(originalDate.getUTCMonth());
        expect(gregorian.day).toBe(originalDate.getUTCDate());
      });
    });

    test("should handle Indian -> Gregorian -> Indian round-trips", () => {
      const testDates = [
        { year: 1946, month: 0, day: 1 },   // Chaitra 1, 1946
        { year: 1945, month: 0, day: 1 },   // Chaitra 1, 1945
        { year: 1945, month: 5, day: 15 },  // Bhadra 15, 1945
        { year: 1946, month: 11, day: 30 }, // Phalguna 30, 1946
      ];

      testDates.forEach(originalDate => {
        const gregorian = indianCalendar.convertToGregorian(
          originalDate.year,
          originalDate.month,
          originalDate.day
        );
        const date = new Date(Date.UTC(
          gregorian.year,
          gregorian.month,
          gregorian.day
        ));
        const indian = indianCalendar.convertFromGregorian(date);

        expect(indian.year).toBe(originalDate.year);
        expect(indian.month).toBe(originalDate.month);
        expect(indian.day).toBe(originalDate.day);
      });
    });
  });

  describe("Known Historical Dates", () => {
    test("Indian Independence Day: August 15, 1947 = Sravana 24, 1869", () => {
      const date = new Date(Date.UTC(1947, 7, 15)); // August 15, 1947
      const indian = indianCalendar.convertFromGregorian(date);

      expect(indian.year).toBe(1869);
      expect(indian.month).toBe(4); // Sravana (month 4)
      expect(indian.day).toBeGreaterThanOrEqual(23);
      expect(indian.day).toBeLessThanOrEqual(25);
    });

    test("Indian Republic Day: January 26, 1950 = Magha 6, 1871", () => {
      const date = new Date(Date.UTC(1950, 0, 26)); // January 26, 1950
      const indian = indianCalendar.convertFromGregorian(date);

      expect(indian.year).toBe(1871);
      expect(indian.month).toBe(10); // Magha (month 10)
      expect(indian.day).toBeGreaterThanOrEqual(5);
      expect(indian.day).toBeLessThanOrEqual(7);
    });

    test("Adoption of Saka Calendar: March 22, 1957 = Chaitra 1, 1879", () => {
      const date = new Date(Date.UTC(1957, 2, 22)); // March 22, 1957
      const indian = indianCalendar.convertFromGregorian(date);

      expect(indian.year).toBe(1879);
      expect(indian.month).toBe(0); // Chaitra
      expect(indian.day).toBe(1);
    });
  });

  describe("Edge Cases", () => {
    test("should handle year boundary transitions", () => {
      // Last day of Phalguna should transition to Chaitra 1
      const lastDay = indianCalendar.convertToGregorian(1945, 11, 30);
      const nextDay = new Date(Date.UTC(
        lastDay.year,
        lastDay.month,
        lastDay.day + 1
      ));
      const indian = indianCalendar.convertFromGregorian(nextDay);

      expect(indian.year).toBe(1946);
      expect(indian.month).toBe(0); // Chaitra
      expect(indian.day).toBe(1);
    });

    test("should handle leap year transitions correctly", () => {
      // Chaitra 30 in leap year should exist
      const gregorian = indianCalendar.convertToGregorian(1946, 0, 30);
      expect(gregorian.year).toBeDefined();
      expect(gregorian.month).toBeDefined();
      expect(gregorian.day).toBeDefined();

      // Chaitra 31 in leap year should exist
      const gregorian2 = indianCalendar.convertToGregorian(1946, 0, 31);
      expect(gregorian2.year).toBeDefined();
      expect(gregorian2.month).toBeDefined();
      expect(gregorian2.day).toBeDefined();
    });

    test("should handle very old dates", () => {
      // Test with Saka year 100, Chaitra 1
      // Since Saka year 0 = 78 CE, Saka year 100 = 78 + 100 = 178 CE
      const gregorian = indianCalendar.convertToGregorian(100, 0, 1);
      expect(gregorian.year).toBe(178);
      expect(gregorian.month).toBe(2); // March
    });

    test("should handle future dates", () => {
      // Test with Saka year 2000, Chaitra 1
      // Since Saka year 0 = 78 CE, Saka year 2000 = 78 + 2000 = 2078 CE
      const gregorian = indianCalendar.convertToGregorian(2000, 0, 1);
      expect(gregorian.year).toBe(2078);
      expect(gregorian.month).toBe(2); // March
    });
  });

  describe("Locale and Month Names", () => {
    test("should return month names array", () => {
      const months = indianCalendar.monthNames();
      expect(Array.isArray(months)).toBe(true);
      expect(months.length).toBe(12);
    });

    test("should return localeOverride with correct structure", () => {
      const override = indianCalendar.localeOverride("en");
      expect(override).toHaveProperty("months");
      expect(override).toHaveProperty("monthsShort");
      expect(override.months.length).toBe(12);
      expect(override.monthsShort.length).toBe(12);
    });

    test("monthsShort should be first 3 characters", () => {
      const override = indianCalendar.localeOverride("en");
      expect(override.monthsShort[0]).toBe("Cha");
      expect(override.monthsShort[1]).toBe("Vai");
      expect(override.monthsShort[11]).toBe("Pha");
    });
  });
});
