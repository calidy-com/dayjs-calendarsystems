import dayjs from "dayjs";
import "dayjs/locale/fa";
import "dayjs/locale/fr";
import "dayjs/locale/ar";
import "dayjs/locale/he";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import HebrewCalendarSystem from "../src/calendarSystems/HebrewCalendarSystem";
import AmazighCalendarSystem from "../src/calendarSystems/AmazighCalendarSystem";

describe("startOf method with different calendar systems", () => {
  beforeAll(() => {
    dayjs.extend(localizedFormat);
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
    dayjs.registerCalendarSystem("hebrew", new HebrewCalendarSystem());
    dayjs.registerCalendarSystem("amazigh", new AmazighCalendarSystem());
  });

  test("should return the correct format for persian calendar", () => {
    const date = dayjs("2023-05-14").toCalendarSystem("persian");
    expect(date.format("YY")).toEqual("02");
    expect(date.format("YYYY")).toEqual("1402");
    expect(date.format("M")).toEqual("2");
    expect(date.format("MM")).toEqual("02");
    expect(date.format("MMM")).toEqual("Ord");
    expect(date.format("MMMM")).toEqual("Ordibehesht");
    expect(date.locale("fa").format("MMMM")).toEqual("اردیبهشت");
    expect(date.format("DD")).toEqual("24");
    expect(date.format("D")).toEqual("24");
    expect(date.format("W")).toEqual("W");
    expect(date.format("HH")).toEqual("00");
    expect(date.format("LL")).toEqual("Ordibehesht 24, 1402");
    expect(date.format("LLL")).toEqual("Ordibehesht 24, 1402 12:00 AM");
    expect(date.format("LLLL")).toEqual(
      "Sunday, Ordibehesht 24, 1402 12:00 AM"
    );
    expect(date.locale("fa").format("LLL")).toEqual("24 اردیبهشت 1402 00:00");
  });

  test("should return the correct format for Hijri calendar", () => {
    const date = dayjs("2023-04-10").toCalendarSystem("islamic");
    expect(date.format("YY")).toEqual("44");
    expect(date.format("YYYY")).toEqual("1444");
    expect(date.format("M")).toEqual("9");
    expect(date.format("MM")).toEqual("09");
    expect(date.format("MMM")).toEqual("Ram");
    expect(date.format("MMMM")).toEqual("Ramadan");
    expect(date.locale("ar").format("MMMM")).toEqual("رمضان");
    expect(date.format("DD")).toEqual("19");
    expect(date.format("D")).toEqual("19");
    expect(date.format("W")).toEqual("W");
    expect(date.format("HH")).toEqual("00");
    expect(date.format("LL")).toEqual("Ramadan 19, 1444");
    expect(date.format("LLL")).toEqual("Ramadan 19, 1444 12:00 AM");
    expect(date.format("LLLL")).toEqual(
      "Monday, Ramadan 19, 1444 12:00 AM"
    );
    expect(date.locale("ar").format("LLL")).toEqual("19 رمضان 1444 00:00");
  });

  test("should return the correct format for Hebrew calendar", () => {
    const date = dayjs("2023-05-02").toCalendarSystem("hebrew");
    expect(date.format("YY")).toEqual("83");
    expect(date.format("YYYY")).toEqual("5783");
    expect(date.format("M")).toEqual("2");
    expect(date.format("MM")).toEqual("02");
    expect(date.format("MMM")).toEqual("Iya");
    expect(date.format("MMMM")).toEqual("Iyar");
    expect(date.locale("he").format("MMMM")).toEqual("אייר");
    expect(date.format("DD")).toEqual("11");
    expect(date.format("D")).toEqual("11");
    expect(date.format("W")).toEqual("W");
    expect(date.format("HH")).toEqual("00");
    expect(date.format("LL")).toEqual("Iyar 11, 5783");
    expect(date.format("LLL")).toEqual("Iyar 11, 5783 12:00 AM");
    expect(date.format("LLLL")).toEqual(
      "Tuesday, Iyar 11, 5783 12:00 AM"
    );
    expect(date.locale("he").format("LLL")).toEqual("11 באייר 5783 00:00");
  });

  test("should return the correct format for Amazigh calendar", () => {
    const date = dayjs("2023-05-24").toCalendarSystem("amazigh");
    expect(date.format("YY")).toEqual("73");
    expect(date.format("YYYY")).toEqual("2973");
    expect(date.format("M")).toEqual("5");
    expect(date.format("MM")).toEqual("05");
    expect(date.format("MMM")).toEqual("May");
    expect(date.format("MMMM")).toEqual("Mayyu");
    expect(date.locale("fr").format("MMMM")).toEqual("Mayyu");
    expect(date.format("DD")).toEqual("11");
    expect(date.format("D")).toEqual("11");
    expect(date.format("W")).toEqual("W");
    expect(date.format("HH")).toEqual("00");
    expect(date.format("LL")).toEqual("Mayyu 11, 2973");
    expect(date.format("LLL")).toEqual("Mayyu 11, 2973 12:00 AM");
    expect(date.format("LLLL")).toEqual(
      "Wednesday, Mayyu 11, 2973 12:00 AM"
    );
    expect(date.locale("fr").format("LLL")).toEqual("11 Mayyu 2973 00:00");
  });
});