/**
 * Calendar System Base Class. 
 * @file CalendarSystemBase.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 * 
 */

// Possible calendars based on the Intl API: 
// "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "gregory", "hebrew", 
// "indian", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", 
// "iso8601", "japanese", "persian", "roc", "islamicc".

export default class CalendarSystemBase {
    static typeName = 'CalendarSystemBase';
    
    constructor(locale = 'en') {
        this.locale = locale;
    }

    convertFromGregorian(date) {
        throw new Error('Method convertFromGregorian must be implemented by subclass');
    }

    convertToGregorian(date) {
        throw new Error('Method convertToGregorian must be implemented by subclass');
    }

    monthNames(locale) {
        throw new Error('Method monthNames must be implemented by subclass');
    }

    getLocalizedMonthName(monthIndex) {
        const monthNames = this.monthNames();
        if (monthIndex < 0 || monthIndex >= monthNames.length) {
            throw new Error('Invalid month index.');
        }

        return new Intl.DateTimeFormat(this.locale, { month: 'long' }).format(new Date(2022, monthIndex));
    }

    localeOverride(locale) {
        return {
            months: this.monthNames(locale),
            monthsShort: this.monthNames(locale).map(month => month.substring(0, 3))
        }
    }
}