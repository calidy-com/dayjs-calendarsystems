import { Dayjs, OpUnitType } from 'dayjs';


type DateLikeObject = { year: number; month: number; day: number; };
type DayjsLikeObject = { $y: number; $M: number; $D: number; };

export declare abstract class CalendarSystemBase {
    locale: string;

    constructor(locale?: string);

    abstract convertFromGregorian(date: Date | DateLikeObject | DayjsLikeObject | string | number | undefined | null): { year: number; month: number; day: number; } | void;
    abstract convertToGregorian(year: number, month: number, day: number): { year: number; month: number; day: number; } | void;
    abstract convertToJulian(year: number, month: number, day: number): number;
    abstract monthNames(locale: string, calendar: string, firstMonthName: string): string[];
    getLocalizedMonthName(monthIndex: number): string;
    localeOverride(locale: string): Object;
    daysInMonth?(): number;
    startOf?(units: OpUnitType,isStartOf: Boolean): Dayjs;
    endOf?(units: OpUnitType): Dayjs;
}