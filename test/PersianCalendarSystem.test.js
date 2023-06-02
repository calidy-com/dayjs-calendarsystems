import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("PersianCalendarSystem", () => {
  let persianCalendar;

  beforeEach(() => {
    persianCalendar = new PersianCalendarSystem();
  });

  test("convertFromGregorian should return the correct Persian date", () => {
    const date = new Date(2023, 4, 14); // May 14, 2023
    const [jy, jm, jd] = CalendarUtils.jd_to_persiana(
      CalendarUtils.gregorian_to_jd(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
    );
    const convertedDate = persianCalendar.convertFromGregorian(date);
    expect(convertedDate.year).toEqual(jy);
    expect(convertedDate.month).toEqual(jm - 1); // -1 because the Persian month is 0-based
    expect(convertedDate.day).toEqual(jd);
  });

  test("convertToGregorian should return the correct Gregorian date", () => {
    const date = { year: 1402, month: 1, day: 25 }; // Persian date: Ordibehesht 25, 1402 (0 based month)
    // NOTE: jd_to_gregorian expects and returns 1-based months
    const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
      CalendarUtils.persiana_to_jd(date.year, date.month + 1, date.day) + 0.5
    );
    const convertedDate = persianCalendar.convertToGregorian(
      date.year,
      date.month,
      date.day
    );
    expect(convertedDate.year).toEqual(gy);
    expect(convertedDate.month).toEqual(gm - 1);// -1 because the jd_to_gregorian month is 1-based
    expect(convertedDate.day).toEqual(gd);
  });

  test("monthNames should return Persian month names", () => {
    const monthNames = persianCalendar.monthNames();
    expect(monthNames).toEqual([
      "Farvardin",
      "Ordibehesht",
      "Khordad",
      "Tir",
      "Mordad",
      "Shahrivar",
      "Mehr",
      "Aban",
      "Azar",
      "Dey",
      "Bahman",
      "Esfand"
    ]);
  });

  test("getLocalizedMonthName should return the correct localized month name", () => {
    // assuming the PersianCalendarSystem defaults to 'en' locale
    expect(persianCalendar.getLocalizedMonthName(0)).toEqual("Farvardin");
    expect(persianCalendar.getLocalizedMonthName(1)).toEqual("Ordibehesht");
  });
});
