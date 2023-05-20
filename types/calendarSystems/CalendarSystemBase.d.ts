export declare abstract class CalendarSystemBase {
    locale: string;

    constructor(locale?: string);

    abstract convertFromGregorian(date: Date | string | number | undefined | null): { year: number; month: number; day: number; } | void;
    abstract convertToGregorian(year: number, month: number, day: number): { year: number; month: number; day: number; } | void;
    abstract monthNames(locale?: string): string[];
    getLocalizedMonthName(monthIndex: number): string;
    localeOverride(locale?: string): { months: string[], monthsShort: string[] };
}