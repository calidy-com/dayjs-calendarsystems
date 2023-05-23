import { CalendarSystemBase } from './CalendarSystemBase';

type DateLikeObject = { year: number; month: number; day: number; };
type DayjsLikeObject = { $y: number; $M: number; $D: number; };

export default class GregoryCalendarSystem extends CalendarSystemBase {
    firstDayOfWeek: number;
    locale: string;
    monthNamesLocalized: string[];

    constructor(locale?: string);

    convertFromGregorian(date: Date | DateLikeObject | DayjsLikeObject | string | number | undefined | null): { year: number; month: number; day: number; };
    convertToGregorian(year: number, month: number, day: number): { year: number; month: number; day: number; };
    convertToJulian(year: number, month: number, day: number): number;
    monthNames(locale: string, calendar: string, firstMonthName: string): string[];
    getLocalizedMonthName(monthIndex: number): string;
}