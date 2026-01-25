/**
 * Regression tests for GitHub issue #18
 * https://github.com/calidy-com/dayjs-calendarsystems/issues/18
 *
 * Verifies that calling toCalendarSystem() on an instance does NOT
 * mutate global state or affect other dayjs instances.
 */
import dayjs from "dayjs";
import "dayjs/locale/ar";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import HebrewCalendarSystem from "../src/calendarSystems/HebrewCalendarSystem";

describe("Instance isolation - GitHub issue #18", () => {
  beforeAll(() => {
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
    dayjs.registerCalendarSystem("hebrew", new HebrewCalendarSystem());
  });

  test("toCalendarSystem on instance should NOT affect new instances", () => {
    // Create a Gregorian date
    const gregorianDate = dayjs("2023-05-14");
    expect(gregorianDate.format("MMMM")).toEqual("May");
    expect(gregorianDate.$C).toBeUndefined();

    // Convert to Islamic calendar
    const islamicDate = gregorianDate.toCalendarSystem("islamic");
    expect(islamicDate.$C).toEqual("islamic");
    expect(islamicDate.format("MMMM")).toEqual("Shawwal");

    // Create a NEW dayjs instance - it should still be Gregorian
    const newGregorianDate = dayjs("2023-05-14");
    expect(newGregorianDate.$C).toBeUndefined();
    expect(newGregorianDate.format("MMMM")).toEqual("May");
  });

  test("multiple calendar conversions should not interfere with each other", () => {
    const baseDate = dayjs("2023-05-14");

    // Convert to different calendars
    const persian = baseDate.toCalendarSystem("persian");
    const islamic = baseDate.toCalendarSystem("islamic");
    const hebrew = baseDate.toCalendarSystem("hebrew");

    // Each should have its own calendar system
    expect(persian.$C).toEqual("persian");
    expect(islamic.$C).toEqual("islamic");
    expect(hebrew.$C).toEqual("hebrew");

    // Each should format with its own month names
    expect(persian.format("MMMM")).toEqual("Ordibehesht");
    expect(islamic.format("MMMM")).toEqual("Shawwal");
    expect(hebrew.format("MMMM")).toEqual("Iyar");

    // Original should still be Gregorian
    expect(baseDate.$C).toBeUndefined();
    expect(baseDate.format("MMMM")).toEqual("May");
  });

  test("new instances after calendar conversion should be Gregorian", () => {
    // Convert an instance to Islamic
    dayjs("2023-01-15").toCalendarSystem("islamic");

    // Create multiple new instances - all should be Gregorian
    const dates = [
      dayjs("2023-01-15"),
      dayjs("2023-06-20"),
      dayjs("2023-12-25"),
    ];

    dates.forEach((date) => {
      expect(date.$C).toBeUndefined();
      expect(date.format("MMMM")).toMatch(
        /^(January|February|March|April|May|June|July|August|September|October|November|December)$/
      );
    });
  });

  test("calendar instance should preserve locale when cloned", () => {
    const islamicDate = dayjs("2023-05-14").toCalendarSystem("islamic");
    const cloned = islamicDate.clone();

    expect(cloned.$C).toEqual("islamic");
    expect(cloned.format("MMMM")).toEqual("Shawwal");
  });

  test("changing locale on calendar instance should update month names", () => {
    const islamicDate = dayjs("2023-04-10").toCalendarSystem("islamic");
    expect(islamicDate.format("MMMM")).toEqual("Ramadan");

    // Change to Arabic locale
    const arabicIslamicDate = islamicDate.locale("ar");
    expect(arabicIslamicDate.format("MMMM")).toEqual("رمضان");

    // Original should still have English month names
    expect(islamicDate.format("MMMM")).toEqual("Ramadan");
  });

  test("factory method vs instance method distinction", () => {
    // Instance method should only affect that instance
    const instance1 = dayjs("2023-05-14");
    const islamicInstance = instance1.toCalendarSystem("islamic");

    expect(islamicInstance.$C).toEqual("islamic");
    expect(instance1.$C).toBeUndefined();

    // New instances should still default to Gregorian
    const instance2 = dayjs("2023-05-14");
    expect(instance2.$C).toBeUndefined();
    expect(instance2.format("MMMM")).toEqual("May");
  });
});
