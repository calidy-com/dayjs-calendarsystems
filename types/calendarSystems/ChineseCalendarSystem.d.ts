import { CalendarSystemBase } from './CalendarSystemBase';

type DateLikeObject = { year: number; month: number; day: number; };
type DayjsLikeObject = { $y: number; $M: number; $D: number; };

export interface SexagenaryCycle {
    stem: string;
    branch: string;
    animal: string;
    cycleName: string;
}

export default class ChineseCalendarSystem extends CalendarSystemBase {
    firstDayOfWeek: number;
    locale: string;
    monthNamesLocalized: string[];

    constructor(locale?: string);

    convertFromGregorian(date: Date | DateLikeObject | DayjsLikeObject | string | number | undefined | null): { year: number; month: number; day: number; };
    convertToGregorian(chineseYear: number, chineseMonth: number, chineseDay: number, hour?: number, minute?: number, second?: number, millisecond?: number): { year: number; month: number; day: number; };
    approximateConversion(date: Date): { year: number; month: number; day: number; };
    convertFromJulian(julianDay: number): [ number, number, number ];
    convertToJulian(year: number, month: number, day: number, hour?: number, minute?: number, second?: number): number;
    isLeapYear(year?: number | null): boolean;
    daysInMonth(year: number, month: number): number;
    getSexagenaryCycle(year: number): SexagenaryCycle;
    getZodiacAnimal(year: number): string;
    monthNames(locale?: string, calendar?: string, firstMonthName?: string): string[];
    getLocalizedMonthName(monthIndex: number): string;
    localeOverride(locale: string): { gregorianMonths: string[]; months: string[]; monthsShort: string[]; };
}
