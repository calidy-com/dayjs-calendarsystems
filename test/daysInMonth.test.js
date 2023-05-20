import dayjs from "dayjs";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";

describe("daysInMonth method with different calendar systems", () => {
  beforeAll(() => {
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
  });

  test("should return the correct number of days in a month for Gregorian calendar", () => {
    const dateInFebruary = dayjs("2023-02-14").toCalendarSystem("gregory");
    expect(dateInFebruary.daysInMonth()).toBe(28);

    const dateInDecember = dayjs("2023-12-14").toCalendarSystem("gregory");
    expect(dateInDecember.daysInMonth()).toBe(31);
  });

  test("should return the correct number of days in a month for Persian calendar", () => {
    const dateInFarvardin = dayjs("2023-03-21").toCalendarSystem("persian");
    const daysInFarvardin = dateInFarvardin.daysInMonth();
    expect(daysInFarvardin).toBe(31);

    const dateInEsfand = dayjs("2024-02-20").toCalendarSystem("persian");
    const daysInEsfand = dateInEsfand.daysInMonth();
    expect(daysInEsfand).toBe(29); // Esfand in a leap year has 29 days
  });
});
