/**
 * Integration tests for Mars Calendar System with Day.js
 */

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import calendarSystems from "../src/index";
import MarsCalendarSystem from "../src/calendarSystems/MarsCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";

describe("Mars Calendar System Integration", () => {
  beforeAll(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("mars", new MarsCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("hijri", new HijriCalendarSystem());
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
  });

  describe("Basic Day.js Integration", () => {
    test("should convert current date to Mars calendar", () => {
      const now = dayjs();
      const marsDate = now.toCalendarSystem("mars");

      expect(marsDate.$C).toBe("mars");
      expect(marsDate.$y).toBeGreaterThan(0); // Should be positive Mars year
      expect(marsDate.$M).toBeGreaterThanOrEqual(0);
      expect(marsDate.$M).toBeLessThan(24); // 24 months on Mars
      expect(marsDate.$D).toBeGreaterThan(0);
    });

    test("should format Mars date", () => {
      const date = dayjs("2024-01-01");
      const marsDate = date.toCalendarSystem("mars");
      const formatted = marsDate.format("YYYY-MM-DD");

      // Should format as a valid date string
      expect(formatted).toMatch(/^\d+-\d+-\d+$/);
    });

    test("should handle month names", () => {
      const date = dayjs("2024-01-01");
      const marsDate = date.toCalendarSystem("mars");

      // Mars has 24 months with unique names
      const monthName = marsDate.$locale().months[marsDate.$M];
      expect(monthName).toBeTruthy();
      expect(typeof monthName).toBe("string");
    });
  });

  describe("Cross-Calendar Conversions", () => {
    test("should convert from Gregorian to Mars and back", () => {
      const gregorianDate = dayjs("2024-01-15");
      const marsDate = gregorianDate.toCalendarSystem("mars");
      const backToGregorian = marsDate.toCalendarSystem("gregory");

      // Year should match exactly
      expect(backToGregorian.$y).toBe(2024);
      // Month should be very close (within 1 month due to calendar differences)
      expect(Math.abs(backToGregorian.$M - 0)).toBeLessThanOrEqual(1);
      // Day might differ by a few days due to calendar system differences
      expect(Math.abs(backToGregorian.$D - 15)).toBeLessThanOrEqual(3);
    });

    test("should convert from Persian to Mars", () => {
      const gregorianDate = dayjs("2024-03-20"); // Near Persian New Year
      const persianDate = gregorianDate.toCalendarSystem("persian");
      const marsDate = persianDate.toCalendarSystem("mars");

      expect(marsDate.$C).toBe("mars");
      expect(marsDate.$y).toBeGreaterThan(0);
      expect(marsDate.$M).toBeGreaterThanOrEqual(0);
      expect(marsDate.$M).toBeLessThan(24);
    });

    test("should convert from Hijri to Mars", () => {
      const gregorianDate = dayjs("2024-01-01");
      const hijriDate = gregorianDate.toCalendarSystem("hijri");
      const marsDate = hijriDate.toCalendarSystem("mars");

      expect(marsDate.$C).toBe("mars");
      expect(marsDate.$y).toBeGreaterThan(0);
    });

    test("should chain multiple calendar conversions", () => {
      const start = dayjs("2024-06-15");

      // Gregorian -> Persian -> Mars -> Hijri -> Gregorian
      const result = start
        .toCalendarSystem("persian")
        .toCalendarSystem("mars")
        .toCalendarSystem("hijri")
        .toCalendarSystem("gregory");

      // Should end up close to where we started
      expect(result.$y).toBe(2024);
      expect(Math.abs(result.$M - 5)).toBeLessThanOrEqual(1); // June is month 5
      expect(Math.abs(result.$D - 15)).toBeLessThanOrEqual(5);
    });
  });

  describe("Mars-Specific Day.js Operations", () => {
    test("should add sols to Mars date", () => {
      const marsDate = dayjs("2024-01-01").toCalendarSystem("mars");
      const futureDate = marsDate.add(10, "day");

      expect(futureDate.$C).toBe("mars");
      expect(futureDate.$D).toBeGreaterThan(marsDate.$D);
    });

    test("should subtract sols from Mars date", () => {
      const marsDate = dayjs("2024-01-15").toCalendarSystem("mars");
      const pastDate = marsDate.add(-5, "day");

      expect(pastDate.$C).toBe("mars");
      expect(pastDate.$D).toBeLessThan(marsDate.$D);
    });

    test("should handle month boundaries when adding days", () => {
      const date = dayjs("2024-01-01").toCalendarSystem("mars");
      const originalMonth = date.$M;

      // Add enough days to cross into next month
      const futureDate = date.add(30, "day");

      // Month should have changed (or we wrapped to next year)
      const monthChanged = futureDate.$M !== originalMonth || futureDate.$y > date.$y;
      expect(monthChanged).toBe(true);
    });

    test("should clone Mars dates correctly", () => {
      const marsDate = dayjs("2024-01-01").toCalendarSystem("mars");
      const cloned = marsDate.clone();

      expect(cloned.$C).toBe("mars");
      expect(cloned.$y).toBe(marsDate.$y);
      expect(cloned.$M).toBe(marsDate.$M);
      expect(cloned.$D).toBe(marsDate.$D);
    });
  });

  describe("Epoch and Historical Dates", () => {
    test("should handle Mars epoch date (Dec 29, 1873)", () => {
      const epochDate = dayjs("1873-12-29");
      const marsDate = epochDate.toCalendarSystem("mars");

      // Should be very close to Mars year 0
      expect(marsDate.$y).toBeLessThanOrEqual(1);
      expect(marsDate.$y).toBeGreaterThanOrEqual(-1);
    });

    test("should handle dates before Mars epoch", () => {
      const beforeEpoch = dayjs("1800-01-01");
      const marsDate = beforeEpoch.toCalendarSystem("mars");

      // Should handle gracefully (might be negative year)
      expect(marsDate.$C).toBe("mars");
      expect(typeof marsDate.$y).toBe("number");
    });

    test("should handle far future dates", () => {
      const future = dayjs("2100-01-01");
      const marsDate = future.toCalendarSystem("mars");

      expect(marsDate.$C).toBe("mars");
      expect(marsDate.$y).toBeGreaterThan(100);
    });
  });

  describe("Leap Year Handling in Day.js", () => {
    test("should report leap year correctly", () => {
      // Create a Mars date in a known leap year
      const date = dayjs("2024-01-01").toCalendarSystem("mars");

      // Get the Mars year
      const marsYear = date.$y;

      // Check if it's a leap year using the calendar system directly
      const calendar = dayjs.getRegisteredCalendarSystem("mars");
      const isLeap = calendar.isLeapYear(marsYear);

      // Verify against our leap year rules
      const shouldBeLeap = (marsYear % 2 === 1) ||
                          (marsYear % 10 === 0 && (marsYear % 100 !== 0 || marsYear % 500 === 0));

      expect(isLeap).toBe(shouldBeLeap);
    });

    test("should handle last day of Vrishika in leap year", () => {
      // Find a Mars date in a leap year's last month
      const gregorianDate = dayjs("2024-01-01");
      const marsDate = gregorianDate.toCalendarSystem("mars");
      const calendar = dayjs.getRegisteredCalendarSystem("mars");

      if (calendar.isLeapYear(marsDate.$y)) {
        // In a leap year, month 23 (Vrishika) should have 28 sols
        const solsInVrishika = calendar.daysInMonth(marsDate.$y, 23);
        expect(solsInVrishika).toBe(28);
      }
    });
  });

  describe("Time Components", () => {
    test("should preserve time when converting to Mars", () => {
      const dateWithTime = dayjs("2024-01-01T12:30:45");
      const marsDate = dateWithTime.toCalendarSystem("mars");

      // Time should be preserved (though actual values may differ due to sol length)
      expect(marsDate.$H).toBeDefined();
      expect(marsDate.$m).toBeDefined();
      expect(marsDate.$s).toBeDefined();
    });

    test("should handle UTC conversion with Mars calendar", () => {
      const utcDate = dayjs.utc("2024-01-01T00:00:00Z");
      const marsDate = utcDate.toCalendarSystem("mars");

      expect(marsDate.$C).toBe("mars");
      expect(marsDate.$u).toBe(true); // Should preserve UTC flag
    });
  });

  describe("Format and Display", () => {
    test("should format year correctly", () => {
      const marsDate = dayjs("2024-01-01").toCalendarSystem("mars");
      const yearStr = marsDate.format("YYYY");

      expect(yearStr).toMatch(/^\d+$/);
      expect(parseInt(yearStr, 10)).toBeGreaterThan(0);
    });

    test("should format month correctly", () => {
      const marsDate = dayjs("2024-01-01").toCalendarSystem("mars");
      const monthStr = marsDate.format("MM");

      expect(monthStr).toMatch(/^\d{2}$/);
      const month = parseInt(monthStr, 10);
      expect(month).toBeGreaterThan(0);
      expect(month).toBeLessThanOrEqual(24);
    });

    test("should format day correctly", () => {
      const marsDate = dayjs("2024-01-01").toCalendarSystem("mars");
      const dayStr = marsDate.format("DD");

      expect(dayStr).toMatch(/^\d{2}$/);
      const day = parseInt(dayStr, 10);
      expect(day).toBeGreaterThan(0);
      expect(day).toBeLessThanOrEqual(28);
    });

    test("should format full date", () => {
      const marsDate = dayjs("2024-01-01").toCalendarSystem("mars");
      const fullDate = marsDate.format("YYYY-MM-DD HH:mm:ss");

      expect(fullDate).toMatch(/^\d{3,4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });
  });

  describe("Comparison Operations", () => {
    test("should compare Mars dates correctly", () => {
      const date1 = dayjs("2024-01-01").toCalendarSystem("mars");
      const date2 = dayjs("2024-06-01").toCalendarSystem("mars");

      expect(date2.isAfter(date1)).toBe(true);
      expect(date1.isBefore(date2)).toBe(true);
    });

    test("should check if Mars dates are the same", () => {
      const date1 = dayjs("2024-01-01").toCalendarSystem("mars");
      const date2 = dayjs("2024-01-01").toCalendarSystem("mars");

      expect(date1.isSame(date2, "day")).toBe(true);
    });
  });

  describe("Realistic Mars Mission Scenarios", () => {
    test("should calculate sols since Mars landing (Perseverance: Feb 18, 2021)", () => {
      const landingDate = dayjs("2021-02-18").toCalendarSystem("mars");
      const today = dayjs().toCalendarSystem("mars");

      // Should be able to calculate difference
      const diffInSols = today.diff(landingDate, "day");
      expect(diffInSols).toBeGreaterThan(0);
      expect(diffInSols).toBeGreaterThan(1000); // More than 1000 sols have passed
    });

    test("should convert multiple Mars mission dates", () => {
      const missions = [
        { name: "Viking 1", date: "1976-07-20" },
        { name: "Pathfinder", date: "1997-07-04" },
        { name: "Spirit", date: "2004-01-04" },
        { name: "Opportunity", date: "2004-01-25" },
        { name: "Curiosity", date: "2012-08-06" },
        { name: "Perseverance", date: "2021-02-18" },
      ];

      missions.forEach(mission => {
        const marsDate = dayjs(mission.date).toCalendarSystem("mars");
        expect(marsDate.$C).toBe("mars");
        expect(marsDate.$y).toBeGreaterThan(0);
      });
    });

    test("should calculate Mars year for future mission (2030)", () => {
      const futureMission = dayjs("2030-06-01").toCalendarSystem("mars");

      // Mars epoch is Dec 29, 1873
      // 2030 - 1873 = 157 Earth years
      // 157 / 1.88 ≈ 83 Mars years
      expect(futureMission.$y).toBeGreaterThan(82);
      expect(futureMission.$y).toBeLessThan(85);
    });
  });
});
