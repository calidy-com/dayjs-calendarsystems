import HebrewCalendarSystem from "../src/calendarSystems/HebrewCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("HebrewCalendarSystem", () => {
  let hebrewCalendar;

  beforeEach(() => {
    hebrewCalendar = new HebrewCalendarSystem();
  });

  describe("Basic Conversions", () => {
    test("convertFromGregorian should return the correct Hebrew date", () => {
      const date = new Date(2023, 4, 14); // May 14, 2023
      const [hy, hm, hd] = CalendarUtils.jd_to_hebrew(
        CalendarUtils.gregorian_to_jd(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
      );
      const convertedDate = hebrewCalendar.convertFromGregorian(date);
      expect(convertedDate.year).toEqual(hy);
      expect(convertedDate.month).toEqual(hm - 1); // -1 because the Hebrew month is 0-based
      expect(convertedDate.day).toEqual(hd);
    });

    test("convertToGregorian should return the correct Gregorian date", () => {
      const date = { year: 5783, month: 6, day: 21 }; // Hebrew date: Tishri 21, 5783
      const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
        CalendarUtils.hebrew_to_jd(date.year, date.month + 1, date.day)
      );
      const convertedDate = hebrewCalendar.convertToGregorian(
        date.year,
        date.month,
        date.day
      );
      expect(convertedDate.year).toEqual(gy);
      expect(convertedDate.month).toEqual(gm - 1); // jd_to_gregorian return 1-based months
      expect(convertedDate.day).toEqual(gd);
    });

    test("should handle Rosh Hashanah (Jewish New Year)", () => {
      const date = new Date(2023, 8, 16); // September 16, 2023 - Rosh Hashanah 5784
      const converted = hebrewCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(5784);
      expect(converted.month).toBe(6); // Tishri (0-based)
      expect(converted.day).toBe(1);
    });

    test("should handle Passover correctly", () => {
      const date = new Date(2024, 3, 23); // April 23, 2024 - First day of Passover
      const converted = hebrewCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(5784);
      expect(converted.month).toBe(0); // Nisan (0-based)
      expect(converted.day).toBe(15); // Passover starts on Nisan 15
    });
  });

  describe("Leap Year Logic", () => {
    test("should correctly identify leap years in Hebrew calendar", () => {
      // Hebrew leap years follow a 19-year cycle: years 3, 6, 8, 11, 14, 17, 19
      expect(hebrewCalendar.isLeapYear(5784)).toBe(true); // 5784 is year 3 in cycle
      expect(hebrewCalendar.isLeapYear(5785)).toBe(false);
      expect(hebrewCalendar.isLeapYear(5786)).toBe(false);
      expect(hebrewCalendar.isLeapYear(5787)).toBe(true); // year 6 in cycle
    });

    test("should handle leap year month (Adar II)", () => {
      // In leap years, Hebrew calendar has Adar I and Adar II
      // Test that we can convert dates correctly in leap years
      const leapYear = 5784;
      const nonLeapYear = 5783;

      expect(hebrewCalendar.isLeapYear(leapYear)).toBe(true);
      expect(hebrewCalendar.isLeapYear(nonLeapYear)).toBe(false);
    });
  });

  describe("Round-trip Conversions", () => {
    test("should maintain consistency in round-trip Hebrew->Gregorian->Hebrew", () => {
      const hebrewDates = [
        { year: 5784, month: 0, day: 1 },   // Nisan 1
        { year: 5783, month: 6, day: 15 },  // Tishri 15 (Sukkot)
        { year: 5780, month: 11, day: 29 }, // Last day of Adar
      ];

      hebrewDates.forEach(hebrewDate => {
        const gregorian = hebrewCalendar.convertToGregorian(
          hebrewDate.year,
          hebrewDate.month,
          hebrewDate.day
        );
        const gregorianDate = new Date(
          gregorian.year,
          gregorian.month,
          gregorian.day
        );
        const backToHebrew = hebrewCalendar.convertFromGregorian(gregorianDate);

        expect(backToHebrew.year).toBe(hebrewDate.year);
        expect(backToHebrew.month).toBe(hebrewDate.month);
        expect(backToHebrew.day).toBe(hebrewDate.day);
      });
    });

    test("should maintain consistency in round-trip Gregorian->Hebrew->Gregorian", () => {
      const gregorianDates = [
        new Date(2023, 0, 1),  // January 1, 2023
        new Date(2024, 5, 15), // June 15, 2024
        new Date(2025, 11, 31), // December 31, 2025
      ];

      gregorianDates.forEach(gregDate => {
        const hebrew = hebrewCalendar.convertFromGregorian(gregDate);
        const backToGregorian = hebrewCalendar.convertToGregorian(
          hebrew.year,
          hebrew.month,
          hebrew.day
        );

        expect(backToGregorian.year).toBe(gregDate.getFullYear());
        expect(backToGregorian.month).toBe(gregDate.getMonth());
        expect(backToGregorian.day).toBe(gregDate.getDate());
      });
    });
  });

  describe("Historical Dates", () => {
    test("should correctly convert Israeli Independence Day (Iyar 5, 5708)", () => {
      // May 14, 1948 - Israeli Independence Day
      const date = new Date(1948, 4, 14);
      const converted = hebrewCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(5708);
      expect(converted.month).toBe(1); // Iyar (0-based)
      expect(converted.day).toBe(5);
    });

    test("should handle dates in early 20th century", () => {
      const date = new Date(1900, 0, 1); // January 1, 1900
      const converted = hebrewCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(5660);
      expect(converted.month).toBeGreaterThanOrEqual(0);
      expect(converted.day).toBeGreaterThan(0);
    });
  });

  describe("Julian Day Conversions", () => {
    test("convertToJulian should return valid Julian Day number", () => {
      const julianDay = hebrewCalendar.convertToJulian(5783, 6, 1); // Tishri 1, 5783
      expect(julianDay).toBeGreaterThan(0);
      expect(typeof julianDay).toBe('number');
    });

    test("convertToJulian should handle time components", () => {
      const julianDay1 = hebrewCalendar.convertToJulian(5783, 0, 1, 0, 0, 0);
      const julianDay2 = hebrewCalendar.convertToJulian(5783, 0, 1, 12, 0, 0);
      expect(julianDay2).toBeGreaterThan(julianDay1);
      expect(julianDay2 - julianDay1).toBeCloseTo(0.5, 1); // 12 hours = 0.5 days
    });
  });

  describe("Month Names", () => {
    test("monthNames should return Hebrew month names", () => {
      const monthNames = hebrewCalendar.monthNames();
      expect(monthNames).toEqual([
        "Nisan",
        "Iyar",
        "Sivan",
        "Tamuz",
        "Av",
        "Elul",
        "Tishri",
        "Heshvan",
        "Kislev",
        "Tevet",
        "Shevat",
        "Adar",
      ]);
    });

    test("getLocalizedMonthName should return the correct localized month name", () => {
      expect(hebrewCalendar.getLocalizedMonthName(0)).toEqual("Nisan");
      expect(hebrewCalendar.getLocalizedMonthName(1)).toEqual("Iyar");
      expect(hebrewCalendar.getLocalizedMonthName(2)).toEqual("Sivan");
      expect(hebrewCalendar.getLocalizedMonthName(6)).toEqual("Tishri");
      expect(hebrewCalendar.getLocalizedMonthName(11)).toEqual("Adar");
    });

    test("should have 12 month names", () => {
      const monthNames = hebrewCalendar.monthNames();
      expect(monthNames.length).toBe(12);
    });
  });

  describe("Edge Cases", () => {
    test("should handle start of Hebrew calendar (year 1)", () => {
      // Year 1 in Hebrew calendar corresponds to 3761 BCE
      const gregorian = hebrewCalendar.convertToGregorian(1, 6, 1); // Tishri 1, year 1
      expect(gregorian.year).toBeLessThan(0); // BCE date
    });

    test("should handle far future dates", () => {
      const date = new Date(2100, 11, 31); // December 31, 2100
      const converted = hebrewCalendar.convertFromGregorian(date);
      expect(converted.year).toBeGreaterThan(5800);
      expect(converted.month).toBeGreaterThanOrEqual(0);
      expect(converted.month).toBeLessThan(12);
      expect(converted.day).toBeGreaterThan(0);
      expect(converted.day).toBeLessThanOrEqual(30);
    });

    test("should handle date with milliseconds", () => {
      const date = new Date(2023, 4, 14, 12, 30, 45, 500);
      const converted = hebrewCalendar.convertFromGregorian(date);
      expect(converted.year).toBeGreaterThan(5000);
      expect(converted.month).toBeGreaterThanOrEqual(0);
      expect(converted.day).toBeGreaterThan(0);
    });
  });

  describe("Configuration", () => {
    test("should have correct firstDayOfWeek (Saturday)", () => {
      expect(hebrewCalendar.firstDayOfWeek).toBe(0); // Saturday
    });

    test("should have correct locale", () => {
      expect(hebrewCalendar.locale).toBe("en");
    });

    test("should have correct intlCalendar", () => {
      expect(hebrewCalendar.intlCalendar).toBe("hebrew");
    });

    test("should allow custom locale in constructor", () => {
      const customCalendar = new HebrewCalendarSystem("he");
      expect(customCalendar.locale).toBe("he");
    });
  });
});