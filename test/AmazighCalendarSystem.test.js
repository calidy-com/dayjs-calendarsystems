import AmazighCalendarSystem from "../src/calendarSystems/AmazighCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("AmazighCalendarSystem", () => {
  let amazighCalendar;

  beforeEach(() => {
    amazighCalendar = new AmazighCalendarSystem();
  });

  describe("Basic Conversions", () => {
    test("convertFromGregorian should return the correct Amazigh date", () => {
      const date = new Date(2023, 4, 14); // May 14, 2023
      const [ay, am, ad] = amazighCalendar.convertFromJulian(
        CalendarUtils.gregorian_to_jd(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        )
      );
      const convertedDate = amazighCalendar.convertFromGregorian(date);
      expect(convertedDate.year).toEqual(ay);
      expect(convertedDate.month).toEqual(am - 1); // -1 because the Amazigh month is 0-based
      expect(convertedDate.day).toEqual(ad);
    });

    test("convertToGregorian should return the correct Gregorian date", () => {
      const date = { year: 2973, month: 0, day: 1 }; // Amazigh date (Yennayer 1, 2973)
      const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
          amazighCalendar.convertToJulian(date.year, date.month, date.day)
      );
      const convertedDate = amazighCalendar.convertToGregorian(
        date.year,
        date.month,
        date.day
      );
      expect(convertedDate.year).toEqual(gy);
      expect(convertedDate.month).toEqual(gm - 1); // -1 because the jd_to_gregorian month is 1-based
      expect(convertedDate.day).toEqual(gd);
    });

    test("should correctly convert Yennayer (Amazigh New Year)", () => {
      // January 14, 2024 is Yennayer 1, 2974
      const date = new Date(2024, 0, 14);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2974);
      expect(converted.month).toBe(0); // Yennayer (0-based)
      expect(converted.day).toBe(1);
    });

    test("should correctly convert dates before Yennayer", () => {
      // January 13, 2024 is still year 2973
      const date = new Date(2024, 0, 13);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2973);
      expect(converted.month).toBe(11); // Last month (Dujember)
    });

    test("should correctly convert dates after Yennayer", () => {
      // January 15, 2024 is Yennayer 2, 2974
      const date = new Date(2024, 0, 15);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2974);
      expect(converted.month).toBe(0); // Yennayer
      expect(converted.day).toBe(2);
    });
  });

  describe("Year Conversion Logic", () => {
    test("gregorianToAmazighYear should correctly calculate Amazigh year", () => {
      expect(amazighCalendar.gregorianToAmazighYear(2024)).toBe(2974);
      expect(amazighCalendar.gregorianToAmazighYear(2023)).toBe(2973);
      expect(amazighCalendar.gregorianToAmazighYear(2025)).toBe(2975);
    });

    test("should handle year offset correctly (950 BCE origin)", () => {
      // Amazigh calendar starts in 950 BCE
      // Year 1 Amazigh = -949 Gregorian
      expect(amazighCalendar.gregorianToAmazighYear(1)).toBe(951);
      expect(amazighCalendar.gregorianToAmazighYear(-949)).toBe(1);
    });

    test("should handle historical dates correctly", () => {
      const date = new Date(1950, 6, 15); // July 15, 1950
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2900);
      expect(converted.month).toBeGreaterThanOrEqual(0);
      expect(converted.day).toBeGreaterThan(0);
    });
  });

  describe("Leap Year Logic", () => {
    test("should correctly identify leap years", () => {
      // Amazigh calendar follows Gregorian leap year rules
      // Amazigh year = Gregorian year + 950
      expect(amazighCalendar.isLeapYear(2974)).toBe(true);  // 2024 Gregorian (leap year: 2024 % 4 == 0)
      expect(amazighCalendar.isLeapYear(2973)).toBe(false); // 2023 Gregorian (not leap year)
      expect(amazighCalendar.isLeapYear(2972)).toBe(false); // 2022 Gregorian (not leap year: 2022 % 4 == 2)
      expect(amazighCalendar.isLeapYear(2976)).toBe(false); // 2026 Gregorian (not leap year: 2026 % 4 == 2)
      expect(amazighCalendar.isLeapYear(2970)).toBe(true);  // 2020 Gregorian (leap year: 2020 % 4 == 0)
    });

    test("should handle century years correctly", () => {
      // Century years: divisible by 100 but not 400 are not leap years
      expect(amazighCalendar.isLeapYear(2950)).toBe(false); // 2000 Gregorian (leap year)
      expect(amazighCalendar.isLeapYear(2850)).toBe(false); // 1900 Gregorian (not leap year)
    });
  });

  describe("Round-trip Conversions", () => {
    test("should maintain consistency in round-trip Amazigh->Gregorian->Amazigh", () => {
      const amazighDates = [
        { year: 2974, month: 0, day: 1 },   // Yennayer 1
        { year: 2973, month: 5, day: 15 },  // Yunyu 15
        { year: 2975, month: 11, day: 31 }, // Dujember 31
      ];

      amazighDates.forEach(amazighDate => {
        const gregorian = amazighCalendar.convertToGregorian(
          amazighDate.year,
          amazighDate.month,
          amazighDate.day
        );
        const gregorianDate = new Date(
          gregorian.year,
          gregorian.month,
          gregorian.day
        );
        const backToAmazigh = amazighCalendar.convertFromGregorian(gregorianDate);

        expect(backToAmazigh.year).toBe(amazighDate.year);
        expect(backToAmazigh.month).toBe(amazighDate.month);
        expect(backToAmazigh.day).toBe(amazighDate.day);
      });
    });

    test("should maintain consistency in round-trip Gregorian->Amazigh->Gregorian", () => {
      const gregorianDates = [
        new Date(2024, 0, 14), // Yennayer
        new Date(2024, 6, 20), // Mid-year
        new Date(2023, 11, 31), // End of year
      ];

      gregorianDates.forEach(gregDate => {
        const amazigh = amazighCalendar.convertFromGregorian(gregDate);
        const backToGregorian = amazighCalendar.convertToGregorian(
          amazigh.year,
          amazigh.month,
          amazigh.day
        );

        expect(backToGregorian.year).toBe(gregDate.getFullYear());
        expect(backToGregorian.month).toBe(gregDate.getMonth());
        expect(backToGregorian.day).toBe(gregDate.getDate());
      });
    });
  });

  describe("Julian Day Conversions", () => {
    test("convertToJulian should return valid Julian Day number", () => {
      const julianDay = amazighCalendar.convertToJulian(2974, 0, 1);
      expect(julianDay).toBeGreaterThan(0);
      expect(typeof julianDay).toBe('number');
    });

    test("convertFromJulian should return correct Amazigh date array", () => {
      const jd = CalendarUtils.gregorian_to_jd(2024, 1, 14); // January 14, 2024
      const [year, month, day] = amazighCalendar.convertFromJulian(jd);
      expect(year).toBe(2974);
      expect(month).toBe(1); // Returns 1-based month
      expect(day).toBe(1);
    });

    test("convertToJulian should handle time components", () => {
      const julianDay1 = amazighCalendar.convertToJulian(2974, 0, 1, 0, 0, 0);
      const julianDay2 = amazighCalendar.convertToJulian(2974, 0, 1, 12, 0, 0);
      expect(julianDay2).toBeGreaterThan(julianDay1);
      expect(julianDay2 - julianDay1).toBeCloseTo(0.5, 1); // 12 hours = 0.5 days
    });
  });

  describe("Month Names", () => {
    test("monthNames should return Amazigh month names", () => {
      const monthNames = amazighCalendar.monthNames();
      expect(monthNames).toEqual([
        "Yennayer", "Furar", "Meghres", "Yebrir", "Mayyu", "Yunyu",
        "Yulyu", "Ghuct", "Cutenber", "Ktuber", "Nunember", "Dujember"
      ]);
    });

    test("getLocalizedMonthName should return the correct localized month name", () => {
      expect(amazighCalendar.getLocalizedMonthName(0)).toEqual("Yennayer");
      expect(amazighCalendar.getLocalizedMonthName(1)).toEqual("Furar");
      expect(amazighCalendar.getLocalizedMonthName(6)).toEqual("Yulyu");
      expect(amazighCalendar.getLocalizedMonthName(11)).toEqual("Dujember");
    });

    test("should have 12 month names", () => {
      const monthNames = amazighCalendar.monthNames();
      expect(monthNames.length).toBe(12);
    });

    test("all month names should be non-empty strings", () => {
      const monthNames = amazighCalendar.monthNames();
      monthNames.forEach(name => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle dates at year boundaries", () => {
      // Last day before Yennayer
      const date1 = new Date(2024, 0, 13);
      const converted1 = amazighCalendar.convertFromGregorian(date1);
      expect(converted1.year).toBe(2973);

      // First day of Yennayer
      const date2 = new Date(2024, 0, 14);
      const converted2 = amazighCalendar.convertFromGregorian(date2);
      expect(converted2.year).toBe(2974);
    });

    test("should handle leap year February correctly", () => {
      // February 29, 2024 (leap year)
      // Yennayer starts on Jan 14, so Furar starts on Feb 14
      // Feb 29 = 15 days after Feb 14 = Furar 16 (29 - 14 + 1 = 16)
      const date = new Date(2024, 1, 29);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2974);
      expect(converted.month).toBe(1); // Furar (February-March in Amazigh calendar)
      expect(converted.day).toBe(16);  // Feb 29 is day 16 of Furar
    });

    test("should handle non-leap year February correctly", () => {
      // February 28, 2023 (non-leap year)
      // Yennayer starts on Jan 14, so Furar starts on Feb 14
      // Feb 28 = 14 days after Feb 14 = Furar 15 (28 - 14 + 1 = 15)
      const date = new Date(2023, 1, 28);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2973);
      expect(converted.month).toBe(1); // Furar (February-March in Amazigh calendar)
      expect(converted.day).toBe(15);  // Feb 28 is day 15 of Furar in non-leap year
    });

    test("should handle far future dates", () => {
      const date = new Date(2100, 11, 31);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(3050);
      expect(converted.month).toBeGreaterThanOrEqual(0);
      expect(converted.month).toBeLessThan(12);
    });

    test("should handle dates with time components", () => {
      const date = new Date(2024, 0, 14, 23, 59, 59, 999);
      const converted = amazighCalendar.convertFromGregorian(date);
      expect(converted.year).toBe(2974);
      expect(converted.month).toBe(0);
      expect(converted.day).toBe(1);
    });
  });

  describe("Configuration", () => {
    test("should have correct firstDayOfWeek (Monday)", () => {
      expect(amazighCalendar.firstDayOfWeek).toBe(1); // Monday
    });

    test("should have correct locale", () => {
      expect(amazighCalendar.locale).toBe("en");
    });

    test("should have correct firstMonthNameEnglish", () => {
      expect(amazighCalendar.firstMonthNameEnglish).toBe("Yennayer");
    });

    test("should allow custom locale in constructor", () => {
      const customCalendar = new AmazighCalendarSystem("fr");
      expect(customCalendar.locale).toBe("fr");
    });
  });

  describe("Cultural Dates", () => {
    test("should correctly identify Yennayer celebration dates", () => {
      // Yennayer is always January 14
      const yennayer2024 = new Date(2024, 0, 14);
      const converted2024 = amazighCalendar.convertFromGregorian(yennayer2024);
      expect(converted2024.year).toBe(2974);
      expect(converted2024.month).toBe(0);
      expect(converted2024.day).toBe(1);

      const yennayer2025 = new Date(2025, 0, 14);
      const converted2025 = amazighCalendar.convertFromGregorian(yennayer2025);
      expect(converted2025.year).toBe(2975);
      expect(converted2025.month).toBe(0);
      expect(converted2025.day).toBe(1);
    });
  });
});
