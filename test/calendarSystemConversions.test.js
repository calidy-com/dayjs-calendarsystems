import dayjs from "dayjs";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import HebrewCalendarSystem from "../src/calendarSystems/HebrewCalendarSystem";
import AmazighCalendarSystem from "../src/calendarSystems/AmazighCalendarSystem";

describe('Calendar Systems Conversion', () => {
  const targetDate = "2023-05-24";
  const targetPersianDate = "1402-03-03";
  const targetIslamicDate = "1444-11-04";
  const targetHebrewDate = "5783-03-04";
  const targetAmazighDate = "2973-05-11";

  beforeAll(() => {
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
    dayjs.registerCalendarSystem("hebrew", new HebrewCalendarSystem());
    dayjs.registerCalendarSystem("amazigh", new AmazighCalendarSystem());
  });

  test('Convert to Hebrew', () => {
    const hebrewDate = dayjs(targetDate).toCalendarSystem("hebrew").format("YYYY-MM-DD");
    expect(hebrewDate).toEqual(targetHebrewDate);
  });
  
  test('Convert to Persian', () => {
    const persianDate = dayjs(targetDate).toCalendarSystem("persian").format("YYYY-MM-DD");
    expect(persianDate).toEqual(targetPersianDate);
  });

  test('Convert to Gregorian', () => {
    const gregorianDate = dayjs(targetDate).toCalendarSystem("gregory").format("YYYY-MM-DD");
    expect(gregorianDate).toEqual(targetDate); // Gregorian date should be the same as targetDate
  });

  test('Convert to Islamic', () => {
    const hijriDate = dayjs(targetDate).toCalendarSystem("islamic").format("YYYY-MM-DD");
    expect(hijriDate).toEqual(targetIslamicDate);
  });

  test('Convert to Amazigh', () => {
    const amazighDate = dayjs(targetDate).toCalendarSystem("amazigh").format("YYYY-MM-DD");
    expect(amazighDate).toEqual(targetAmazighDate);
  });

  test('Convert Persian to Gregorian', () => {
    const persianToGregorian = dayjs(targetDate).toCalendarSystem("persian").toCalendarSystem("gregory").format("YYYY-MM-DD");
    expect(persianToGregorian).toEqual(targetDate);
  });

  test('Convert Persian to Islamic', () => {
    const persianToIslamic = dayjs(targetDate).toCalendarSystem("persian").toCalendarSystem("islamic").format("YYYY-MM-DD");
    expect(persianToIslamic).toEqual(targetIslamicDate);
  });

  test('Convert Gregorian to Persian', () => {
    const gregorianToPersian = dayjs(targetDate).toCalendarSystem("gregory").toCalendarSystem("persian").format("YYYY-MM-DD");
    expect(gregorianToPersian).toEqual(targetPersianDate);
  });

  test('Convert Gregorian to Islamic', () => {
    const gregorianToIslamic = dayjs(targetDate).toCalendarSystem("gregory").toCalendarSystem("islamic").format("YYYY-MM-DD");
    expect(gregorianToIslamic).toEqual(targetIslamicDate);
  });

  test('Convert Hebrew to Gregorian', () => {
    const hebrewToGregorian = dayjs(targetDate).toCalendarSystem("hebrew").toCalendarSystem("gregory").format("YYYY-MM-DD");
    expect(hebrewToGregorian).toEqual(targetDate);
  });
  
  test('Convert Islamic to Persian', () => {
    const islamicToPersian = dayjs(targetDate).toCalendarSystem("islamic").toCalendarSystem("persian").format("YYYY-MM-DD");
    expect(islamicToPersian).toEqual(targetPersianDate);
  });

  test('Convert Hebrew to Persian', () => {
    const hebrewToPersian = dayjs(targetDate).toCalendarSystem("hebrew").toCalendarSystem("persian").format("YYYY-MM-DD");
    expect(hebrewToPersian).toEqual(targetPersianDate);
  });

  test('Convert Islamic to Gregorian', () => {
    const islamicToGregorian = dayjs(targetDate).toCalendarSystem("islamic").toCalendarSystem("gregory").format("YYYY-MM-DD");
    expect(islamicToGregorian).toEqual(targetDate);
  });

  test('Convert Amazigh to Gregorian', () => {
    const amazighToGregorian = dayjs(targetDate).toCalendarSystem("amazigh").toCalendarSystem("gregory").format("YYYY-MM-DD");
    expect(amazighToGregorian).toEqual(targetDate);
  });

  test('Convert Amazigh to Persian', () => {
    const amazighToPersian = dayjs(targetDate).toCalendarSystem("amazigh").toCalendarSystem("persian").format("YYYY-MM-DD");
    expect(amazighToPersian).toEqual(targetPersianDate);
  });

  test('Convert Amazigh to Islamic', () => {
    const amazighToIslamic = dayjs(targetDate).toCalendarSystem("amazigh").toCalendarSystem("islamic").format("YYYY-MM-DD");
    expect(amazighToIslamic).toEqual(targetIslamicDate);
  });

  test('Convert Amazigh to Hebrew', () => {
    const amazighToHebrew = dayjs(targetDate).toCalendarSystem("amazigh").toCalendarSystem("hebrew").format("YYYY-MM-DD");
    expect(amazighToHebrew).toEqual(targetHebrewDate);
  });

  test('Convert Persian to Amazigh', () => {
    const persianToAmazigh = dayjs(targetDate).toCalendarSystem("persian").toCalendarSystem("amazigh").format("YYYY-MM-DD");
    expect(persianToAmazigh).toEqual(targetAmazighDate);
  });
  
});