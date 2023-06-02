/**
 * Calendar System Base Class.
 * @file CalendarSystemBase.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */
import { generateMonthNames } from "../calendarUtils/IntlUtils";

// Possible calendars based on the Intl API:
// "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "gregory", "hebrew",
// "indian", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa",
// "iso8601", "japanese", "persian", "roc", "islamicc".

export default class CalendarSystemBase {
  static typeName = "CalendarSystemBase";

  constructor(locale = "en") {
    this.locale = locale;
    this.intlCalendar = "gregory";
    this.firstMonthNameEnglish = "January";
    this.monthNamesLocalized = generateMonthNames(locale, "gregory", "January");
  }

  convertFromGregorian(date) {
    throw new Error(
      "Method convertFromGregorian must be implemented by subclass"
    );
  }

  // Expects a zero-based month index
  // Returns a zero-based month index
  convertToGregorian(date) {
    throw new Error(
      "Method convertToGregorian must be implemented by subclass"
    );
  }

  // Expects a zero-based month index
  convertToJulian(date) {
    throw new Error("Method convertToJulian must be implemented by subclass");
  }

  isLeapYear(calendarYear) {
    throw new Error("Method isLeapYear must be implemented by subclass");
  }

  monthNames(locale, calendar, firstMonthName) {
    throw new Error("Method monthNames must be implemented by subclass");
  }

  getLocalizedMonthName(monthIndex) {
    const monthNames = this.monthNames();
    if (monthIndex < 0 || monthIndex >= monthNames.length) {
      throw new Error("Invalid month index.");
    }
    return this.monthNamesLocalized[monthIndex];

    // generateMonthNames(this.locale, this.intlCalendar, this.firstMonthNameEnglish);
    // return new Intl.DateTimeFormat(this.locale, { month: "long" }).format(
    //   new Date(2022, monthIndex)
    // );
  }

  localeOverride(locale) {
    return {
      gregorianMonths: this.monthNames(locale, "gregory", "January"),
      months: this.monthNames(locale),
      monthsShort: this.monthNames(locale).map((month) =>
        month.substring(0, 3)
      ),
    };
  }
}
