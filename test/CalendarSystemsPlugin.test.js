import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/fa";
import utc from "dayjs/plugin/utc";
import timeZone from "dayjs/plugin/timezone";

import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";

describe("CalendarSystems Plugin", () => {
  beforeAll(() => {
    dayjs.extend(utc);
    dayjs.extend(timeZone);
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
  });

  test("should register and retrieve a calendar system", () => {
    const persianCalendar = dayjs.getRegisteredCalendarSystem("persian");
    expect(persianCalendar).toBeInstanceOf(PersianCalendarSystem);

    const gregoryCalendar = dayjs.getRegisteredCalendarSystem("gregory");
    expect(gregoryCalendar).toBeInstanceOf(GregoryCalendarSystem);
  });

  test("should convert a Day.js instance to a specific calendar system", () => {
    const when2 = dayjs("2023-05-13T23:00:00.000Z")
      .tz("Europe/Paris")
      .locale("fr")
      .toCalendarSystem("persian")
      .format("ddd YYYY-MM-DD HH:mm:ss");
    const when3 = dayjs("2023-05-13T23:00:00.000Z")
      .tz("Asia/Tehran")
      .locale("fr")
      .toCalendarSystem("persian")
      .format("ddd YYYY-MM-DD HH:mm:ss");

    const date = dayjs(new Date(2023, 4, 14)); // May 14, 2023
    const persianDate = date.toCalendarSystem("persian");
    expect(persianDate.$y).toEqual(1402);
    expect(persianDate.$M).toEqual(1); // Ordibehesht (Months are 0-based)
    expect(persianDate.$D).toEqual(24);
  });

  test("should throw an error for an unregistered calendar system", () => {
    expect(() => {
      dayjs.calendarSystems.toCalendarSystem("unregisteredSystem");
    }).toThrow();
  });
});
