import AmazighCalendarSystem from "../src/calendarSystems/AmazighCalendarSystem";
// Assuming you have or will create equivalent utility functions for Amazigh calendar conversions
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("AmazighCalendarSystem", () => {
  let amazighCalendar;

  beforeEach(() => {
    amazighCalendar = new AmazighCalendarSystem();
  });

  test("convertFromGregorian should return the correct Amazigh date", () => {
    const date = new Date(2023, 4, 14); // May 14, 2023
    // Assuming jd_to_amazigh and gregorian_to_jd functions are correctly implemented for the Amazigh calendar
    const [ay, am, ad] = amazighCalendar.convertFromJulian(
      CalendarUtils.gregorian_to_jd(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
    );
    const convertedDate = amazighCalendar.convertFromGregorian(date);
    expect(convertedDate.year).toEqual(ay);
    expect(convertedDate.month).toEqual(am - 1); // -1 because the Amazigh month is 0-based
    expect(convertedDate.day).toEqual(ad);
  });

  test("convertToGregorian should return the correct Gregorian date", () => {
    const date = { year: 2973, month: 1, day: 25 }; // Amazigh date
    // Assuming jd_to_gregorian and amazigh_to_jd functions are correctly implemented
    const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
        amazighCalendar.convertToJulian(date.year, date.month + 1, date.day) + 0.5
    );
    const convertedDate = amazighCalendar.convertToGregorian(
      date.year,
      date.month,
      date.day
    );
    expect(convertedDate.year).toEqual(gy);
    expect(convertedDate.month).toEqual(gm - 1); // -1 because the jd_to_gregorian month is 1-based
    expect(convertedDate.day).toEqual(gd);
  });

  test("monthNames should return Amazigh month names", () => {
    const monthNames = amazighCalendar.monthNames();
    expect(monthNames).toEqual([
      "Yennayer", "Furar", "Meghres", "Yebrir", "Mayyu", "Yunyu",
      "Yulyu", "Ghuct", "Cutenber", "Ktuber", "Nunember", "Dujember"
    ]);
  });

  test("getLocalizedMonthName should return the correct localized month name", () => {
    // assuming the AmazighCalendarSystem defaults to 'en' locale or handles localization internally
    expect(amazighCalendar.getLocalizedMonthName(0)).toEqual("Yennayer");
    expect(amazighCalendar.getLocalizedMonthName(1)).toEqual("Furar");
  });
});
