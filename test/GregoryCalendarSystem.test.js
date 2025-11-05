import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";

describe("GregoryCalendarSystem", () => {
  let gregoryCalendar;

  beforeEach(() => {
    gregoryCalendar = new GregoryCalendarSystem();
  });

  describe("Basic Conversions", () => {
    test("convertFromGregory should return the same date", () => {
      const date = new Date(2023, 4, 14); // May 14, 2023
      const convertedDate = gregoryCalendar.convertFromGregorian(date);
      expect(convertedDate.getTime()).toEqual(date.getTime());
    });

    test("convertToGregory should return the same date components", () => {
      const convertedDate = gregoryCalendar.convertToGregorian(2023, 4, 14);
      expect(convertedDate.year).toEqual(2023);
      expect(convertedDate.month).toEqual(4);
      expect(convertedDate.day).toEqual(14);
    });

    test("convertFromGregorian should preserve date object", () => {
      const dates = [
        new Date(2024, 0, 1),
        new Date(2023, 11, 31),
        new Date(2024, 5, 15),
      ];

      dates.forEach(date => {
        const converted = gregoryCalendar.convertFromGregorian(date);
        expect(converted).toBe(date);
        expect(converted.getTime()).toBe(date.getTime());
      });
    });

    test("convertToGregorian should handle all date components", () => {
      const result = gregoryCalendar.convertToGregorian(2024, 11, 31);
      expect(result.year).toBe(2024);
      expect(result.month).toBe(11);
      expect(result.day).toBe(31);
    });
  });

  describe("Month Names", () => {
    test("monthNames should return Gregory month names", () => {
      const monthNames = gregoryCalendar.monthNames();
      expect(monthNames).toEqual([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]);
    });

    test("getLocalizedMonthName should return the correct month name", () => {
      expect(gregoryCalendar.getLocalizedMonthName(0)).toEqual("January");
      expect(gregoryCalendar.getLocalizedMonthName(1)).toEqual("February");
      expect(gregoryCalendar.getLocalizedMonthName(5)).toEqual("June");
      expect(gregoryCalendar.getLocalizedMonthName(11)).toEqual("December");
    });

    test("should have 12 month names", () => {
      const monthNames = gregoryCalendar.monthNames();
      expect(monthNames.length).toBe(12);
    });

    test("all month names should be non-empty strings", () => {
      const monthNames = gregoryCalendar.monthNames();
      monthNames.forEach((name, index) => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle leap year dates", () => {
      // February 29, 2024
      const leapDate = new Date(2024, 1, 29);
      const converted = gregoryCalendar.convertFromGregorian(leapDate);
      expect(converted.getFullYear()).toBe(2024);
      expect(converted.getMonth()).toBe(1);
      expect(converted.getDate()).toBe(29);
    });

    test("should handle year boundaries", () => {
      // End of year
      const endOfYear = new Date(2023, 11, 31);
      const converted1 = gregoryCalendar.convertFromGregorian(endOfYear);
      expect(converted1.getDate()).toBe(31);
      expect(converted1.getMonth()).toBe(11);

      // Start of year
      const startOfYear = new Date(2024, 0, 1);
      const converted2 = gregoryCalendar.convertFromGregorian(startOfYear);
      expect(converted2.getDate()).toBe(1);
      expect(converted2.getMonth()).toBe(0);
    });

    test("should handle dates with time components", () => {
      const dateWithTime = new Date(2023, 6, 15, 14, 30, 45, 123);
      const converted = gregoryCalendar.convertFromGregorian(dateWithTime);
      expect(converted.getHours()).toBe(14);
      expect(converted.getMinutes()).toBe(30);
      expect(converted.getSeconds()).toBe(45);
      expect(converted.getMilliseconds()).toBe(123);
    });

    test("should handle far past dates", () => {
      const oldDate = new Date(1900, 0, 1);
      const converted = gregoryCalendar.convertFromGregorian(oldDate);
      expect(converted.getFullYear()).toBe(1900);
    });

    test("should handle far future dates", () => {
      const futureDate = new Date(2100, 11, 31);
      const converted = gregoryCalendar.convertFromGregorian(futureDate);
      expect(converted.getFullYear()).toBe(2100);
      expect(converted.getMonth()).toBe(11);
      expect(converted.getDate()).toBe(31);
    });
  });

  describe("Month Index Consistency", () => {
    test("should handle all months correctly (0-indexed)", () => {
      for (let month = 0; month < 12; month++) {
        const result = gregoryCalendar.convertToGregorian(2023, month, 15);
        expect(result.month).toBe(month);
      }
    });

    test("should preserve month index in round-trip", () => {
      for (let month = 0; month < 12; month++) {
        const date = new Date(2023, month, 15);
        const converted = gregoryCalendar.convertFromGregorian(date);
        expect(converted.getMonth()).toBe(month);
      }
    });
  });

  describe("Configuration", () => {
    test("should have correct firstDayOfWeek (Saturday)", () => {
      expect(gregoryCalendar.firstDayOfWeek).toBe(6); // Saturday
    });

    test("should have correct locale", () => {
      expect(gregoryCalendar.locale).toBe("en");
    });

    test("should have correct intlCalendar", () => {
      expect(gregoryCalendar.intlCalendar).toBe("gregory");
    });

    test("should have correct firstMonthNameEnglish", () => {
      expect(gregoryCalendar.firstMonthNameEnglish).toBe("January");
    });

    test("should allow custom locale in constructor", () => {
      const customCalendar = new GregoryCalendarSystem("fr");
      expect(customCalendar.locale).toBe("fr");
    });
  });

  describe("Days in Month", () => {
    test("should handle months with 31 days", () => {
      const months31Days = [0, 2, 4, 6, 7, 9, 11]; // Jan, Mar, May, Jul, Aug, Oct, Dec
      months31Days.forEach(month => {
        const date = new Date(2023, month, 31);
        const converted = gregoryCalendar.convertFromGregorian(date);
        expect(converted.getDate()).toBe(31);
      });
    });

    test("should handle months with 30 days", () => {
      const months30Days = [3, 5, 8, 10]; // Apr, Jun, Sep, Nov
      months30Days.forEach(month => {
        const date = new Date(2023, month, 30);
        const converted = gregoryCalendar.convertFromGregorian(date);
        expect(converted.getDate()).toBe(30);
      });
    });

    test("should handle February in non-leap year", () => {
      const date = new Date(2023, 1, 28); // Feb 28, 2023 (not leap year)
      const converted = gregoryCalendar.convertFromGregorian(date);
      expect(converted.getDate()).toBe(28);
      expect(converted.getMonth()).toBe(1);
    });

    test("should handle February in leap year", () => {
      const date = new Date(2024, 1, 29); // Feb 29, 2024 (leap year)
      const converted = gregoryCalendar.convertFromGregorian(date);
      expect(converted.getDate()).toBe(29);
      expect(converted.getMonth()).toBe(1);
    });
  });

  describe("Historical Dates", () => {
    test("should handle dates from different centuries", () => {
      const dates = [
        new Date(1900, 0, 1),  // 20th century
        new Date(2000, 0, 1),  // 21st century
        new Date(2100, 0, 1),  // 22nd century
      ];

      dates.forEach(date => {
        const converted = gregoryCalendar.convertFromGregorian(date);
        expect(converted.getFullYear()).toBe(date.getFullYear());
        expect(converted.getMonth()).toBe(date.getMonth());
        expect(converted.getDate()).toBe(date.getDate());
      });
    });

    test("should handle century leap years correctly", () => {
      // 2000 was a leap year (divisible by 400)
      const leapCentury = new Date(2000, 1, 29);
      const converted1 = gregoryCalendar.convertFromGregorian(leapCentury);
      expect(converted1.getDate()).toBe(29);

      // 1900 was not a leap year (divisible by 100 but not 400)
      // We can't test Feb 29, 1900 as it's invalid, but we can test Feb 28
      const nonLeapCentury = new Date(1900, 1, 28);
      const converted2 = gregoryCalendar.convertFromGregorian(nonLeapCentury);
      expect(converted2.getDate()).toBe(28);
    });
  });
});
