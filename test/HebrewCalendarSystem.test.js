import HebrewCalendarSystem from "../src/calendarSystems/HebrewCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("HebrewCalendarSystem", () => {
  let hebrewCalendar;

  beforeEach(() => {
    hebrewCalendar = new HebrewCalendarSystem();
  });

  test("convertFromGregorian should return the correct Hebrew date", () => {
    const date = new Date(2023, 4, 14); // May 14, 2023
    const [hy, hm, hd] = CalendarUtils.jd_to_hebrew(
      CalendarUtils.gregorian_to_jd(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
    );
    const convertedDate = hebrewCalendar.convertFromGregorian(date);
    expect(convertedDate.year).toEqual(hy);
    expect(convertedDate.month).toEqual(hm - 1); // -1 because the Hebrew month is 0-based
    expect(convertedDate.day).toEqual(hd);
  });

  test("convertToGregorian should return the correct Gregorian date", () => {
    const date = { year: 5783, month: 6, day: 21 }; // Hebrew date: Tishri 21, 5783
    const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
      CalendarUtils.hebrew_to_jd(date.year, date.month + 1, date.day)
    );
    const convertedDate = hebrewCalendar.convertToGregorian(
      date.year,
      date.month,
      date.day
    );
    expect(convertedDate.year).toEqual(gy);
    expect(convertedDate.month).toEqual(gm - 1); // jd_to_gregorian return 1-based months
    expect(convertedDate.day).toEqual(gd);
  });

  test("monthNames should return Hebrew month names", () => {
    const monthNames = hebrewCalendar.monthNames();
    expect(monthNames).toEqual([
      "Nisan",
      "Iyar",
      "Sivan",
      "Tamuz",
      "Av",
      "Elul",
      "Tishri",
      "Heshvan",
      "Kislev",
      "Tevet",
      "Shevat",
      "Adar",
    ]);
  });

  test("getLocalizedMonthName should return the correct localized month name", () => {
    // assuming the HebrewCalendarSystem defaults to 'en' locale
    expect(hebrewCalendar.getLocalizedMonthName(0)).toEqual("Nisan");
    expect(hebrewCalendar.getLocalizedMonthName(1)).toEqual("Iyar");
    expect(hebrewCalendar.getLocalizedMonthName(2)).toEqual("Sivan");
  });
});