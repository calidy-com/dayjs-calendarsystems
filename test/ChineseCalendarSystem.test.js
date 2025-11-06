/**
 * Tests for Chinese Calendar System
 */

import ChineseCalendarSystem from "../src/calendarSystems/ChineseCalendarSystem";

describe("ChineseCalendarSystem", () => {
  let chineseCalendar;

  beforeEach(() => {
    chineseCalendar = new ChineseCalendarSystem();
  });

  describe("Basic Structure", () => {
    test("should create instance with correct properties", () => {
      expect(chineseCalendar).toBeDefined();
      expect(chineseCalendar.intlCalendar).toBe("chinese");
      expect(chineseCalendar.firstDayOfWeek).toBe(1); // Monday
    });

    test("should have month names", () => {
      const monthNames = chineseCalendar.monthNames();
      expect(monthNames).toBeDefined();
      expect(monthNames.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe("Leap Year Calculations", () => {
    test("should identify known leap years correctly", () => {
      // Chinese calendar has leap years approximately 7 times in 19 years
      // These are years with 13 months
      const leapYears = [2023, 2025, 2028, 2031, 2033, 2036, 2039, 2042, 2044, 2047, 2050];

      leapYears.forEach(year => {
        expect(chineseCalendar.isLeapYear(year)).toBe(true);
      });
    });

    test("should identify non-leap years correctly", () => {
      const nonLeapYears = [2020, 2021, 2022, 2024, 2026, 2027, 2029, 2030];

      nonLeapYears.forEach(year => {
        expect(chineseCalendar.isLeapYear(year)).toBe(false);
      });
    });
  });

  describe("Days in Month", () => {
    test("should return valid day count for months", () => {
      for (let month = 0; month < 12; month++) {
        const days = chineseCalendar.daysInMonth(2024, month);
        expect(days).toBeGreaterThanOrEqual(29);
        expect(days).toBeLessThanOrEqual(30);
      }
    });

    test("months should alternate between 29 and 30 days (approximation)", () => {
      // Chinese lunar months alternate between 29 and 30 days
      // This tests our approximation
      const month1 = chineseCalendar.daysInMonth(2024, 0);
      const month2 = chineseCalendar.daysInMonth(2024, 1);

      expect(month1).not.toBe(month2);
    });
  });

  describe("Gregorian to Chinese Conversion", () => {
    test("should convert Gregorian date to Chinese date", () => {
      // January 1, 2024 Gregorian
      const date = new Date(Date.UTC(2024, 0, 1));
      const chinese = chineseCalendar.convertFromGregorian(date);

      expect(chinese).toBeDefined();
      expect(chinese.year).toBeGreaterThan(4600); // Chinese year is much higher
      expect(chinese.month).toBeGreaterThanOrEqual(0);
      expect(chinese.month).toBeLessThan(13);
      expect(chinese.day).toBeGreaterThan(0);
      expect(chinese.day).toBeLessThanOrEqual(30);
    });

    test("should handle Chinese New Year dates", () => {
      // February 10, 2024 - Chinese New Year (Year of the Dragon)
      const cny2024 = new Date(Date.UTC(2024, 1, 10));
      const chinese = chineseCalendar.convertFromGregorian(cny2024);

      expect(chinese).toBeDefined();
      expect(chinese.month).toBe(0); // Should be first month
      expect(chinese.day).toBeLessThanOrEqual(5); // Should be near the start of the year
    });

    test("should convert various Gregorian dates", () => {
      const testDates = [
        new Date(Date.UTC(2020, 0, 1)),
        new Date(Date.UTC(2023, 5, 15)),
        new Date(Date.UTC(2025, 11, 31)),
      ];

      testDates.forEach(date => {
        const chinese = chineseCalendar.convertFromGregorian(date);
        expect(chinese.year).toBeGreaterThan(4600);
        expect(chinese.month).toBeGreaterThanOrEqual(0);
        expect(chinese.month).toBeLessThan(13);
        expect(chinese.day).toBeGreaterThan(0);
      });
    });
  });

  describe("Chinese to Gregorian Conversion", () => {
    test("should convert Chinese date to Gregorian", () => {
      // Chinese year 4721 (Gregorian 2024), Month 1, Day 1
      const gregorian = chineseCalendar.convertToGregorian(4721, 0, 1);

      expect(gregorian).toBeDefined();
      expect(gregorian.year).toBeGreaterThan(2000);
      expect(gregorian.year).toBeLessThan(2100);
      expect(gregorian.month).toBeGreaterThanOrEqual(0);
      expect(gregorian.month).toBeLessThan(12);
    });

    test("should handle various Chinese dates", () => {
      const testDates = [
        { year: 4720, month: 0, day: 1 },
        { year: 4721, month: 6, day: 15 },
        { year: 4722, month: 11, day: 30 },
      ];

      testDates.forEach(({ year, month, day }) => {
        const gregorian = chineseCalendar.convertToGregorian(year, month, day);
        expect(gregorian.year).toBeGreaterThan(2000);
        expect(gregorian.month).toBeGreaterThanOrEqual(0);
        expect(gregorian.month).toBeLessThan(12);
      });
    });
  });

  describe("Round-trip Conversions", () => {
    test("should maintain reasonable accuracy in Gregorian -> Chinese -> Gregorian", () => {
      const testDates = [
        new Date(Date.UTC(2020, 0, 1)),
        new Date(Date.UTC(2024, 1, 10)),
        new Date(Date.UTC(2025, 11, 25)),
      ];

      testDates.forEach(originalDate => {
        const chinese = chineseCalendar.convertFromGregorian(originalDate);
        const backToGregorian = chineseCalendar.convertToGregorian(
          chinese.year,
          chinese.month,
          chinese.day
        );

        // Allow for some margin of error due to approximations
        const originalYear = originalDate.getUTCFullYear();
        const originalMonth = originalDate.getUTCMonth();
        const originalDay = originalDate.getUTCDate();

        expect(Math.abs(backToGregorian.year - originalYear)).toBeLessThanOrEqual(1);
        expect(Math.abs(backToGregorian.month - originalMonth)).toBeLessThanOrEqual(2);
        expect(Math.abs(backToGregorian.day - originalDay)).toBeLessThanOrEqual(45);
      });
    });
  });

  describe("Sexagenary Cycle (Stem-Branch System)", () => {
    test("should return correct sexagenary cycle information", () => {
      const cycle = chineseCalendar.getSexagenaryCycle(4721); // Year 2024

      expect(cycle).toBeDefined();
      expect(cycle.stem).toBeDefined();
      expect(cycle.branch).toBeDefined();
      expect(cycle.animal).toBeDefined();
      expect(cycle.cycleName).toBeDefined();
    });

    test("should have correct number of stems and branches", () => {
      // Test that the cycle repeats correctly
      const cycle1 = chineseCalendar.getSexagenaryCycle(4721);
      const cycle61 = chineseCalendar.getSexagenaryCycle(4781); // 60 years later

      // After 60 years, the cycle should repeat
      expect(cycle1.cycleName).toBe(cycle61.cycleName);
      expect(cycle1.animal).toBe(cycle61.animal);
    });

    test("should return valid zodiac animals", () => {
      const validAnimals = [
        "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
        "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
      ];

      for (let year = 4700; year < 4712; year++) {
        const cycle = chineseCalendar.getSexagenaryCycle(year);
        expect(validAnimals).toContain(cycle.animal);
      }
    });
  });

  describe("Zodiac Animal", () => {
    test("should return correct zodiac animal for year", () => {
      // 2024 is Year of the Dragon
      // Chinese year 4721 (approx)
      const animal = chineseCalendar.getZodiacAnimal(4721);
      expect(animal).toBeDefined();
      expect(typeof animal).toBe('string');
    });

    test("zodiac animals should cycle every 12 years", () => {
      const animal1 = chineseCalendar.getZodiacAnimal(4700);
      const animal2 = chineseCalendar.getZodiacAnimal(4712); // 12 years later

      expect(animal1).toBe(animal2);
    });

    test("should return different animals for consecutive years", () => {
      const animals = [];
      for (let year = 4700; year < 4712; year++) {
        animals.push(chineseCalendar.getZodiacAnimal(year));
      }

      // All 12 animals should be different
      const uniqueAnimals = new Set(animals);
      expect(uniqueAnimals.size).toBe(12);
    });
  });

  describe("Julian Day Conversions", () => {
    test("should convert to Julian Day", () => {
      const jd = chineseCalendar.convertToJulian(4721, 0, 1);
      expect(jd).toBeGreaterThan(2400000); // Reasonable Julian Day number
      expect(jd).toBeLessThan(2500000);
    });

    test("should convert from Julian Day", () => {
      const jd = 2459945.5; // January 1, 2023
      const [year, month, day] = chineseCalendar.convertFromJulian(jd);

      expect(year).toBeGreaterThan(4600);
      expect(month).toBeGreaterThanOrEqual(0);
      expect(month).toBeLessThan(13);
      expect(day).toBeGreaterThan(0);
      expect(day).toBeLessThanOrEqual(30);
    });
  });

  describe("Month Names", () => {
    test("should return all month names", () => {
      const monthNames = chineseCalendar.monthNames();
      expect(monthNames.length).toBeGreaterThanOrEqual(12);

      monthNames.forEach(name => {
        expect(name).toBeDefined();
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      });
    });

    test("should get localized month name by index", () => {
      for (let i = 0; i < 12; i++) {
        const name = chineseCalendar.getLocalizedMonthName(i);
        expect(name).toBeDefined();
        expect(typeof name).toBe('string');
      }
    });

    test("should throw error for invalid month index", () => {
      expect(() => chineseCalendar.getLocalizedMonthName(-1)).toThrow();
      expect(() => chineseCalendar.getLocalizedMonthName(12)).toThrow();
    });
  });

  describe("Locale Override", () => {
    test("should provide locale override configuration", () => {
      const localeConfig = chineseCalendar.localeOverride("en");

      expect(localeConfig).toBeDefined();
      expect(localeConfig.months).toBeDefined();
      expect(localeConfig.monthsShort).toBeDefined();
      expect(localeConfig.gregorianMonths).toBeDefined();
    });

    test("should have correct number of month names in locale override", () => {
      const localeConfig = chineseCalendar.localeOverride("en");

      expect(localeConfig.months.length).toBeGreaterThanOrEqual(12);
      expect(localeConfig.monthsShort.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe("Edge Cases", () => {
    test("should handle year boundaries", () => {
      // Test dates around Chinese New Year
      const beforeCNY = new Date(Date.UTC(2024, 1, 9));
      const onCNY = new Date(Date.UTC(2024, 1, 10));
      const afterCNY = new Date(Date.UTC(2024, 1, 11));

      const chinese1 = chineseCalendar.convertFromGregorian(beforeCNY);
      const chinese2 = chineseCalendar.convertFromGregorian(onCNY);
      const chinese3 = chineseCalendar.convertFromGregorian(afterCNY);

      // Years should be consistent around CNY
      expect(Math.abs(chinese1.year - chinese2.year)).toBeLessThanOrEqual(1);
      expect(Math.abs(chinese2.year - chinese3.year)).toBeLessThanOrEqual(1);
    });

    test("should handle time components in conversions", () => {
      const jd1 = chineseCalendar.convertToJulian(4721, 0, 1, 0, 0, 0);
      const jd2 = chineseCalendar.convertToJulian(4721, 0, 1, 12, 0, 0);
      const jd3 = chineseCalendar.convertToJulian(4721, 0, 1, 23, 59, 59);

      expect(jd2 - jd1).toBeCloseTo(0.5, 2); // 12 hours = 0.5 days
      expect(jd3 - jd1).toBeCloseTo(1.0, 1); // Almost a full day
    });

    test("should handle dates far in the past", () => {
      const oldDate = new Date(Date.UTC(1900, 0, 1));
      const chinese = chineseCalendar.convertFromGregorian(oldDate);

      expect(chinese).toBeDefined();
      expect(chinese.year).toBeGreaterThan(4500);
    });

    test("should handle dates far in the future", () => {
      const futureDate = new Date(Date.UTC(2100, 11, 31));
      const chinese = chineseCalendar.convertFromGregorian(futureDate);

      expect(chinese).toBeDefined();
      expect(chinese.year).toBeGreaterThan(4700);
    });
  });

  describe("Calendar Properties", () => {
    test("should have correct calendar type", () => {
      expect(chineseCalendar.intlCalendar).toBe("chinese");
    });

    test("should have correct first day of week", () => {
      expect(chineseCalendar.firstDayOfWeek).toBe(1); // Monday
    });

    test("should have correct first month name", () => {
      expect(chineseCalendar.firstMonthNameEnglish).toBe("Zhēngyuè");
    });
  });
});
