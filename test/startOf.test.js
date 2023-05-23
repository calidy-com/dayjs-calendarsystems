import dayjs from "dayjs";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";

describe("startOf method with different calendar systems", () => {
  beforeAll(() => {
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
  });

  test("should return the start of the year in Gregorian calendar", () => {
    const date = dayjs("2023-05-14").toCalendarSystem("gregory");
    const startOfYear = date.startOf("year");
    expect(startOfYear.format("YYYY-MM-DD")).toBe("2023-01-01");
  });

  test("should return the start of the year in Persian calendar", () => {
    const date = dayjs("2023-05-14").toCalendarSystem("persian");
    const startOfYear = date.startOf("year");
    expect(startOfYear.format("YYYY-MM-DD")).toBe("1402-01-01"); // Farvardin 1, 1402
  });

  test("should return the start of the year in Hijri calendar", () => {
    const date = dayjs("2022-07-30").toCalendarSystem("islamic");
    const startOfYear = date.startOf("year");
    expect(startOfYear.format("YYYY-MM-DD")).toBe("1444-01-01"); // Muharram 1, 1444
  });
});
