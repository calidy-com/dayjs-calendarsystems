import dayjs from "dayjs";
import timeZone from "dayjs/plugin/timezone";
//import toArray from "dayjs/plugin/toArray";
import utc from "dayjs/plugin/utc";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
// import "dayjs/locale/fa";

describe("daysInMonth method with different calendar systems", () => {
  beforeAll(() => {
    dayjs.extend(utc);
    dayjs.extend(timeZone);
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
  });

  test("should return the correct number of days in a month for Gregorian calendar", () => {
    const dateInFebruary = dayjs("2023-02-14").toCalendarSystem("gregory");
    expect(dateInFebruary.daysInMonth()).toBe(28);

    const dateInDecember = dayjs("2023-12-14").toCalendarSystem("gregory");
    expect(dateInDecember.daysInMonth()).toBe(31);
  });

  test("should return the correct number of days in a month for Persian calendar", () => {
    const dateInFarvardin = dayjs("2023-03-24").utc().tz("Europe/Paris").toCalendarSystem("persian");
    const daysInFarvardin = dateInFarvardin.daysInMonth();
    expect(daysInFarvardin).toBe(31);

    const dateInOrdibehesht = dayjs("2023-04-25").toCalendarSystem("persian");
    const daysInOrdibehesht = dateInOrdibehesht.daysInMonth();
    expect(daysInOrdibehesht).toBe(31);

    const dateInKhordad = dayjs("2023-05-30").toCalendarSystem("persian");
    const daysInKhordad = dateInKhordad.daysInMonth();
    expect(daysInKhordad).toBe(31);

    const dateInTir = dayjs("2023-06-27").toCalendarSystem("persian");
    const daysInTir = dateInTir.daysInMonth();
    expect(daysInTir).toBe(31);

    const dateInMordad = dayjs("2023-07-23").toCalendarSystem("persian");
    const daysInMordad = dateInMordad.daysInMonth();
    expect(daysInMordad).toBe(31);

    const dateInShahrivar = dayjs("2023-08-29").toCalendarSystem("persian");
    const daysInShahrivar = dateInShahrivar.daysInMonth();
    expect(daysInShahrivar).toBe(31);

    const dateInMehr = dayjs("2023-09-26").toCalendarSystem("persian");
    const daysInMehr = dateInMehr.daysInMonth();
    expect(daysInMehr).toBe(30);

    const dateInAban = dayjs("2023-10-24").toCalendarSystem("persian");
    const daysInAban = dateInAban.daysInMonth();
    expect(daysInAban).toBe(30);

    const dateInAzar = dayjs("2023-11-28").toCalendarSystem("persian");
    const daysInAzar = dateInAzar.daysInMonth();
    expect(daysInAzar).toBe(30);

    const dateInDey = dayjs("2023-12-28").tz("Europe/Paris").utc().toCalendarSystem("persian");
    const daysInDey = dateInDey.daysInMonth();
    expect(daysInDey).toBe(30);

    const dateInBahman = dayjs("2024-01-23").utc().tz("Europe/Paris").toCalendarSystem("persian");
    const daysInBahman = dateInBahman.daysInMonth();
    expect(daysInBahman).toBe(30);
    
    const dateInEsfandNonLeap = dayjs("2024-03-05").tz("Europe/Paris").toCalendarSystem("persian");
    const daysInEsfandNonLeap = dateInEsfandNonLeap.daysInMonth();
    expect(daysInEsfandNonLeap).toBe(29); // Esfand in a non leap(normal) year has 29 days

    const dateInEsfand4yrLeap = dayjs("2025-03-05").tz("Europe/Paris").toCalendarSystem("persian");
    const daysInEsfand4yrLeap = dateInEsfand4yrLeap.daysInMonth();
    expect(daysInEsfand4yrLeap).toBe(30); // Esfand in a 4-year leap year has 30 days

    const dateInEsfand5yrLeap = dayjs("2030-03-05").tz("Europe/Paris").toCalendarSystem("persian");
    const daysInEsfand5yrLeap = dateInEsfand5yrLeap.daysInMonth();
    expect(daysInEsfand5yrLeap).toBe(30); // Esfand in a 5-year leap year has 30 days
  });


  test("should return the correct number of days in a month for Hijri calendar", () => {
    const dateInMuharram = dayjs("2021-09-05").utc().tz("Europe/Paris").toCalendarSystem("islamic");
    const daysInMuharram = dateInMuharram.daysInMonth();
    expect(daysInMuharram).toBe(30);

    const dateInSafar = dayjs("2021-09-25").toCalendarSystem("islamic");
    const daysInSafar = dateInSafar.daysInMonth();
    expect(daysInSafar).toBe(29);

    const dateInRabiI = dayjs("2023-10-05").toCalendarSystem("islamic");
    const daysInRabiI = dateInRabiI.daysInMonth();
    expect(daysInRabiI).toBe(30);

    const dateInRabiII = dayjs("2021-11-15").toCalendarSystem("islamic");
    const daysInRabiII = dateInRabiII.daysInMonth();
    expect(daysInRabiII).toBe(29);

    const dateInJumadaI = dayjs("2022-01-01").toCalendarSystem("islamic");
    const daysInJumadaI = dateInJumadaI.daysInMonth();
    expect(daysInJumadaI).toBe(30);

    const dateInJumadaII = dayjs("2022-01-15").toCalendarSystem("islamic");
    const daysInJumadaII = dateInJumadaII.daysInMonth();
    expect(daysInJumadaII).toBe(29);

    const dateInRajab = dayjs("2022-02-15").toCalendarSystem("islamic");
    const daysInRajab = dateInRajab.daysInMonth();
    expect(daysInRajab).toBe(30);

    const dateInShaaban = dayjs("2022-03-15").toCalendarSystem("islamic");
    const daysInShaaban = dateInShaaban.daysInMonth();
    expect(daysInShaaban).toBe(29);

    const dateInRamadan = dayjs("2022-04-15").toCalendarSystem("islamic");
    const daysInRamadan = dateInRamadan.daysInMonth();
    expect(daysInRamadan).toBe(30);

    const dateInShawwal = dayjs("2022-05-15").toCalendarSystem("islamic");
    const daysInShawwal = dateInShawwal.daysInMonth();
    expect(daysInShawwal).toBe(29);

    const dateInDhulQadah = dayjs("2022-06-15").toCalendarSystem("islamic");
    const daysInDhulQadah = dateInDhulQadah.daysInMonth();
    expect(daysInDhulQadah).toBe(30);

    const dateInDhulHijjah = dayjs("2022-07-20").toCalendarSystem("islamic");
    const daysInDhulHijjah = dateInDhulHijjah.daysInMonth();
    expect(daysInDhulHijjah).toBe(29); // non leap year
    
    const dateInDhulHijjahLeap = dayjs("2021-08-01").toCalendarSystem("islamic");
    const daysInDhulHijjahLeap = dateInDhulHijjahLeap.daysInMonth();
    expect(daysInDhulHijjahLeap).toBe(30); // leap year

});
});
