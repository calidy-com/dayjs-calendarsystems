import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";
import * as CalendarUtils from "../src/calendarUtils/fourmilabCalendar";

describe("HijriCalendarSystem", () => {
  let hijriCalendar;

  beforeEach(() => {
    hijriCalendar = new HijriCalendarSystem();
  });

  test("convertFromGregorian should use islamic-umalqura calendar via Intl API", () => {
    // This test now validates that we're using the Intl API with islamic-umalqura
    // which provides accurate conversions based on astronomical observations

    // Test with April 14, 2023 at noon UTC
    const date = new Date(Date.UTC(2023, 3, 14, 12, 0, 0)); // April 14, 2023
    const convertedDate = hijriCalendar.convertFromGregorian(date);

    // islamic-umalqura calendar gives the correct date
    expect(convertedDate.year).toEqual(1444);
    expect(convertedDate.month).toEqual(8); // Ramadan (0-based)
    expect(convertedDate.day).toEqual(23);
  });

  test("convertFromGregorian should handle July 2025 dates correctly (Issue #7)", () => {
    // This specifically tests the fix for Issue #7
    const date1 = new Date(Date.UTC(2025, 6, 6, 12, 0, 0)); // July 6, 2025
    const converted1 = hijriCalendar.convertFromGregorian(date1);

    expect(converted1.year).toEqual(1447);
    expect(converted1.month).toEqual(0); // Muharram
    expect(converted1.day).toEqual(11); // islamic-umalqura gives 11, not 10

    const date2 = new Date(Date.UTC(2025, 6, 5, 12, 0, 0)); // July 5, 2025
    const converted2 = hijriCalendar.convertFromGregorian(date2);

    expect(converted2.year).toEqual(1447);
    expect(converted2.month).toEqual(0);
    expect(converted2.day).toEqual(10);
  });

  test("convertToGregorian should use binary search with Intl API", () => {
    // Test conversion from Hijri back to Gregorian
    // Uses binary search since Intl API only works one way

    // Ramadan 23, 1444 should be April 14, 2023
    const convertedDate = hijriCalendar.convertToGregorian(1444, 8, 23);
    expect(convertedDate.year).toEqual(2023);
    expect(convertedDate.month).toEqual(3); // April (0-based)
    expect(convertedDate.day).toEqual(14);
  });

  test("convertToGregorian should handle Muharram 1447 dates (Issue #7)", () => {
    // Muharram 11, 1447 should be July 7, 2025 (based on Umm al-Qura calendar)
    const converted1 = hijriCalendar.convertToGregorian(1447, 0, 11);
    expect(converted1.year).toEqual(2025);
    expect(converted1.month).toEqual(6); // July (0-based)
    expect(converted1.day).toEqual(7);

    // Muharram 10, 1447 should be July 6, 2025 (based on Umm al-Qura calendar)
    const converted2 = hijriCalendar.convertToGregorian(1447, 0, 10);
    expect(converted2.year).toEqual(2025);
    expect(converted2.month).toEqual(6); // July (0-based)
    expect(converted2.day).toEqual(6);
  });

  test("round-trip conversion should preserve dates", () => {
    // Test that converting Gregorian -> Hijri -> Gregorian gives the same date
    const originalDate = new Date(Date.UTC(2023, 3, 14, 12, 0, 0));
    const hijri = hijriCalendar.convertFromGregorian(originalDate);
    const backToGregorian = hijriCalendar.convertToGregorian(hijri.year, hijri.month, hijri.day);

    expect(backToGregorian.year).toEqual(2023);
    expect(backToGregorian.month).toEqual(3);
    expect(backToGregorian.day).toEqual(14);
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