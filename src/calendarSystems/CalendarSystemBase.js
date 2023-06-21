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

  convertFromJulian(date) {
    throw new Error("Method convertToJulian must be implemented by subclass");
  }

  // Expects a zero-based month index
  // Retrieve the Julian date equivalent for this date,
  // i.e. days since January 1, 4713 BCE Greenwich noon.
  // The Julian Day starts at noon, not at midnight. 
  // So, when you convert a Gregorian date to a Julian Day number, 
  // the result is the Julian Day number for the noon of that day. 
  // If the time of the date is noon or later, the Julian Day number will be for the next day.
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

  validateDate(date) {
    // extract year, month, day from date.
    // date can be of type Date, Dayjs or object.
    // if date is object, it should have year, month and day properties.
    // if date is Dayjs, it should have $y, $M and $D properties.
    // if date is Date, it should have getFullYear(), getMonth() and getDate() methods.
    // if date is string, it should be in ISO format.
    // if date is number, it should be in milliseconds.
    // if date is undefined, it should be now.
    // if date is null, it should be now.
    if (date === undefined || date === null) {
      date = new Date();
    } else if (typeof date === "string") {
      date = new Date(date);
    } else if (typeof date === "number") {
      date = new Date(date);
    } else if (date instanceof Date) {
      // do nothing
    } else if (
      date.$y !== undefined &&
      date.$M !== undefined &&
      date.$D !== undefined
    ) {
      date = new Date(
        date.$y,
        date.$M,
        date.$D,
        date.$H,
        date.$m,
        date.$s,
        date.$ms
      );
    } else if (
      date.year !== undefined &&
      date.month !== undefined &&
      date.day !== undefined
    ) {
      date = new Date(date.year, date.month, date.day);
    } else {
      throw new Error("Invalid date");
    }

    return date;
  }

}
