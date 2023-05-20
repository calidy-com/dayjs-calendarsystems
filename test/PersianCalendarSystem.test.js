import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import * as CalendarUtils from "../src/utils/fourmilabCalendar";

describe("PersianCalendarSystem", () => {
  let persianCalendar;

  beforeEach(() => {
    persianCalendar = new PersianCalendarSystem();
  });

  test("convertFromGregorian should return the correct Persian date", () => {
    const date = new Date(2023, 4, 14); // May 14, 2023
    const [jy, jm, jd] = CalendarUtils.jd_to_persian(
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
    const date = { year: 1402, month: 2, day: 25 }; // Persian date: Ordibehesht 25, 1402
    const [gy, gm, gd] = CalendarUtils.jd_to_gregorian(
      CalendarUtils.persian_to_jd(date.year, date.month, date.day)
    );
    const convertedDate = persianCalendar.convertToGregorian(
      date.year,
      date.month,
      date.day
    );
    expect(convertedDate.year).toEqual(gy);
    expect(convertedDate.month).toEqual(gm); // jd_to_gregorian return 1-based months
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
