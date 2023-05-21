import dayjs from "dayjs";
import timeZone from "dayjs/plugin/timezone";
//import toArray from "dayjs/plugin/toArray";
import utc from "dayjs/plugin/utc";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";

describe("daysInMonth method with different calendar systems", () => {
  beforeAll(() => {
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.extend(utc);
    dayjs.extend(timeZone);
  });

  test("should return the correct number of days in a month for Gregorian calendar", () => {
    const dateInFebruary = dayjs("2023-02-14").toCalendarSystem("gregory");
    expect(dateInFebruary.daysInMonth()).toBe(28);

    const dateInDecember = dayjs("2023-12-14").toCalendarSystem("gregory");
    expect(dateInDecember.daysInMonth()).toBe(31);
  });

  test("should return the correct number of days in a month for Persian calendar", () => {
    // console.log("TEST_DAYS_IN_MONTH", 
    // dayjs("2023-03-21").toDate().toLocaleString('en-US', { timeZone: "Europe/Paris" }), 
    // dayjs("2023-03-21").toCalendarSystem("persian").toDate().toLocaleString('en-US', { timeZone: "Europe/Paris" }), 
    // dayjs("2023-03-21").tz("Europe/Paris").toCalendarSystem("persian").toDate().toLocaleString('en-US', { timeZone: "Europe/Paris" })
    // );
    const dateInFarvardin = dayjs("2023-03-21").tz("Europe/Paris").toCalendarSystem("persian");
    const daysInFarvardin = dateInFarvardin.daysInMonth();
    expect(daysInFarvardin).toBe(31);

    const dateInOrdibehesht = dayjs("2023-04-21").toCalendarSystem("persian");
    const daysInOrdibehesht = dateInOrdibehesht.daysInMonth();
    expect(daysInOrdibehesht).toBe(31);

    const dateInKhordad = dayjs("2023-05-21").toCalendarSystem("persian");
    const daysInKhordad = dateInKhordad.daysInMonth();
    expect(daysInKhordad).toBe(31);

    const dateInTir = dayjs("2023-06-21").toCalendarSystem("persian");
    const daysInTir = dateInTir.daysInMonth();
    expect(daysInTir).toBe(31);

    const dateInMordad = dayjs("2023-07-21").toCalendarSystem("persian");
    const daysInMordad = dateInMordad.daysInMonth();
    expect(daysInMordad).toBe(31);

    const dateInShahrivar = dayjs("2023-08-21").toCalendarSystem("persian");
    const daysInShahrivar = dateInShahrivar.daysInMonth();
    expect(daysInShahrivar).toBe(31);

    const dateInMehr = dayjs("2023-09-23").toCalendarSystem("persian");
    const daysInMehr = dateInMehr.daysInMonth();
    expect(daysInMehr).toBe(30);

    const dateInAban = dayjs("2023-10-21").toCalendarSystem("persian");
    const daysInAban = dateInAban.daysInMonth();
    expect(daysInAban).toBe(30);

    const dateInAzar = dayjs("2023-11-21").toCalendarSystem("persian");
    const daysInAzar = dateInAzar.daysInMonth();
    expect(daysInAzar).toBe(30);

    const dateInDey = dayjs("2023-12-21").tz("Europe/Paris").toCalendarSystem("persian");
    const daysInDey = dateInDey.daysInMonth();
    expect(daysInDey).toBe(30);

    const dateInBahman = dayjs("2023-01-21").tz("Europe/Paris").toCalendarSystem("persian");
    const daysInBahman = dateInBahman.daysInMonth();
    expect(daysInBahman).toBe(30);
    
    const dateInEsfand = dayjs("2024-02-20").toCalendarSystem("persian");
    const daysInEsfand = dateInEsfand.daysInMonth();
    expect(daysInEsfand).toBe(29); // Esfand in a leap year has 29 days
  });
});
