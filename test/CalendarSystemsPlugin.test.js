import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/fa";
import utc from "dayjs/plugin/utc";
import timeZone from "dayjs/plugin/timezone";

import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import HebrewCalendarSystem from "../src/calendarSystems/HebrewCalendarSystem";

describe("CalendarSystems Plugin", () => {
  beforeAll(() => {
    dayjs.extend(utc);
    dayjs.extend(timeZone);
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
    dayjs.registerCalendarSystem("hebrew", new HebrewCalendarSystem());
  });

  test("should register and retrieve a calendar system", () => {
    const persianCalendar = dayjs.getRegisteredCalendarSystem("persian");
    expect(persianCalendar).toBeInstanceOf(PersianCalendarSystem);

    const hijriCalendar = dayjs.getRegisteredCalendarSystem("islamic");
    expect(hijriCalendar).toBeInstanceOf(HijriCalendarSystem);

    const gregoryCalendar = dayjs.getRegisteredCalendarSystem("gregory");
    expect(gregoryCalendar).toBeInstanceOf(GregoryCalendarSystem);

    const hebrewCalendar = dayjs.getRegisteredCalendarSystem("hebrew");
    expect(hebrewCalendar).toBeInstanceOf(HebrewCalendarSystem);
  });

  test("should convert a Day.js instance to a specific calendar system", () => {
    const date = dayjs(new Date(2023, 3, 14)); // April 14, 2023 (! Date month is 0-based !)
    const persianDate = date.toCalendarSystem("persian");
    expect(persianDate.$y).toEqual(1402);
    expect(persianDate.$M).toEqual(0); // Farvardin is 1st month but the indexes are 0 based so we use 0. (Months are 0-based)
    expect(persianDate.$D).toEqual(25);

    const hijriDate = date.toCalendarSystem("islamic");
    expect(hijriDate.$y).toEqual(1444);
    expect(hijriDate.$M).toEqual(8); // Ramadan is 9th month but the indexes are 0 based so we use 8. (Months are 0-based)
    expect(hijriDate.$D).toEqual(23);

    const hebrewDate = date.toCalendarSystem("hebrew");
    expect(hebrewDate.$y).toEqual(5783);
    expect(hebrewDate.$M).toEqual(0);  // Nisan is 1st month but the indexes are 0 based so we use 0. (Months are 0-based)
    expect(hebrewDate.$D).toEqual(23);
  });

  test("should throw an error for an unregistered calendar system", () => {
    expect(() => {
      dayjs.calendarSystems.toCalendarSystem("unregisteredSystem");
    }).toThrow();
  });
});
