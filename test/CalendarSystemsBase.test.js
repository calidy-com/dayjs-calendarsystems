import CalendarSystemBase from "../src/calendarSystems/CalendarSystemBase";
// Mock subclass that implements monthNames
class MockCalendarSystem extends CalendarSystemBase {
  monthNames() {
    return [
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
    ];
  }
}

describe("CalendarSystemBase", () => {
  let calendarSystemBase;

  beforeEach(() => {
    calendarSystemBase = new MockCalendarSystem();
  });

  test("should throw error when calling convertToJulian", () => {
    expect(() => calendarSystemBase.convertToJulian(new Date())).toThrow(
      Error
    );
  });

  test("should throw error when calling convertFromGregorian", () => {
    expect(() => calendarSystemBase.convertFromGregorian(new Date())).toThrow(
      Error
    );
  });

  test("should throw error when calling convertToGregorian", () => {
    expect(() => calendarSystemBase.convertToGregorian(new Date())).toThrow(
      Error
    );
  });

  test("should throw error when calling monthNames", () => {
    // Create a separate instance of CalendarSystemBase for this test
    const baseInstance = new CalendarSystemBase();
    expect(() => baseInstance.monthNames()).toThrow(Error);
  });

  test("should throw error when calling getLocalizedMonthName with invalid month index", () => {
    expect(() => calendarSystemBase.getLocalizedMonthName(12)).toThrow(Error);
  });

  test("should return localized month name when calling getLocalizedMonthName with valid month index", () => {
    // Assuming the base class defaults to 'en' locale
    expect(calendarSystemBase.getLocalizedMonthName(0)).toEqual("January");
  });
});
