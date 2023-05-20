/**
 * Gregorian Calendar System
 * 
 * @file GregoryCalendarSystem.js
 * @project dayjs-calendarsystems
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 * 
 */

import CalendarSystemBase from './CalendarSystemBase';

export default class GregoryCalendarSystem extends CalendarSystemBase {
     convertFromGregorian(date) {
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
        } else if (typeof date === 'string') {
            date = new Date(date);
        } else if (typeof date === 'number') {
            date = new Date(date);
        } else if (date instanceof Date) {
            // do nothing
        } else if (date.$y !== undefined && date.$M !== undefined && date.$D !== undefined) {
            date = new Date(date.$y, date.$M, date.$D);
        } else if (date.year !== undefined && date.month !== undefined && date.day !== undefined) {
            date = new Date(date.year, date.month, date.day);
        } else {
            throw new Error('Invalid date');
        }

        return date;
    }

    convertToGregorian(year, month, day) {
        return {
          year: year,
          month: month,
          day: day
        };
    }

    monthNames() {
        return Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(1970, i)));
    }
}