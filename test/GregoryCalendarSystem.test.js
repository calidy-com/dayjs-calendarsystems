import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";

describe("GregoryCalendarSystem", () => {
  let gregoryCalendar;

  beforeEach(() => {
    gregoryCalendar = new GregoryCalendarSystem();
  });

  test("convertFromGregory should return the same date", () => {
    const date = new Date(2023, 4, 14); // May 14, 2023
    const convertedDate = gregoryCalendar.convertFromGregorian(date);
    expect(convertedDate.getTime()).toEqual(date.getTime());
  });

  test("convertToGregory should return the same date", () => {
    const convertedDate = gregoryCalendar.convertToGregorian("2023", "4", "14");
    expect(convertedDate.year).toEqual("2023");
    expect(convertedDate.month).toEqual("4");
    expect(convertedDate.day).toEqual("14");
  });

  test("monthNames should return Gregory month names", () => {
    const monthNames = gregoryCalendar.monthNames();
    expect(monthNames).toEqual([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]);
  });

  test("getLocalizedMonthName should return the correct month name", () => {
    // assuming the GregoryCalendarSystem defaults to 'en' locale
    expect(gregoryCalendar.getLocalizedMonthName(0)).toEqual("January");
    expect(gregoryCalendar.getLocalizedMonthName(1)).toEqual("February");
    // ... and so on for the other months
  });
});
