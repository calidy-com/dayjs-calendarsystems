import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("HijriCalendarSystem", () => {
  let hijriCalendar;

  beforeEach(() => {
    hijriCalendar = new HijriCalendarSystem();
  });

  test("convertFromGregorian should return the correct Hijri date", () => {
    const date = new Date(2023, 4, 14); // May 14, 2023
    const [hy, hm, hd] = CalendarUtils.jd_to_islamic(
      CalendarUtils.gregorian_to_jd(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
    );
    const convertedDate = hijriCalendar.convertFromGregorian(date);
    expect(convertedDate.year).toEqual(hy);
    expect(convertedDate.month).toEqual(hm - 1); // -1 because the Hijri month is 0-based
    expect(convertedDate.day).toEqual(hd);
  });

  test("convertToGregorian should return the correct Gregorian date", () => {
    const date = { year: 1444, month: 8, day: 21 }; // Hijri date: Ramadan 21, 1444 (0 based month)
    // NOTE: jd_to_gregorian expects and returns 1-based months
    const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
      CalendarUtils.islamic_to_jd(date.year, date.month + 1, date.day)
    );
    const convertedDate = hijriCalendar.convertToGregorian(
      date.year,
      date.month,
      date.day
    );
    expect(convertedDate.year).toEqual(gy);
    expect(convertedDate.month).toEqual(gm - 1); // -1 because the jd_to_gregorian month is 1-based
    expect(convertedDate.day).toEqual(gd);
  });

  test("monthNames should return Hijri month names", () => {
    const monthNames = hijriCalendar.monthNames();
    expect(monthNames).toEqual([
      "Muharram",
      "Safar",
      "Rabiʻ I",
      "Rabiʻ II",
      "Jumada I",
      "Jumada II",
      "Rajab",
      "Shaʻban",
      "Ramadan",
      "Shawwal",
      "Dhuʻl-Qiʻdah",
      "Dhuʻl-Hijjah"
    ]);
  });

  test("getLocalizedMonthName should return the correct localized month name", () => {
    // assuming the HijriCalendarSystem defaults to 'en' locale
    expect(hijriCalendar.getLocalizedMonthName(0)).toEqual("Muharram");
    expect(hijriCalendar.getLocalizedMonthName(1)).toEqual("Safar");
  });
});