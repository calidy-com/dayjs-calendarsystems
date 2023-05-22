import { PluginFunc, Dayjs, OpUnitType } from 'dayjs';

type DateLikeObject = { year: number; month: number; day: number; };
type DayjsLikeObject = { $y: number; $M: number; $D: number; };
type CalendarSystem =  'persian' | 'gregorian' | 'islamic' | 'julian' | 'indian' | 'hebrew' | 'ethiopian' | 'coptic' | 'buddhist' | 'japanese' | 'roc' | 'nanakshahi' | 'isoWeek' | 'week' | 'quarter' | 'month' | 'year' | 'decade' | 'century' | 'millennium';

declare module 'dayjs' {
  interface Dayjs {
    clone(): Dayjs;
    startOf(units: OpUnitType, startOf?: boolean): Dayjs;
    $set(units: OpUnitType, int: number): Dayjs;
    add(number: number, units: OpUnitType): Dayjs;
    date(input?: number): Dayjs | number;
    toCalendarSystem(calendar: CalendarSystem): Dayjs;
  }
  interface DayjsConstructor {
    registerCalendarSystem(name: CalendarSystem, calendarSystem: CalendarSystemBase): void;
    getRegisteredCalendarSystem(name: string): CalendarSystemBase;
    toCalendarSystem(calendar: CalendarSystem): DayjsConstructor;
    fromCalendarSystem(name: CalendarSystem, year: number, month: number, day: number): Dayjs;
  }
  const registerCalendarSystem: DayjsConstructor["registerCalendarSystem"];
  const getRegisteredCalendarSystem: DayjsConstructor["getRegisteredCalendarSystem"];
  const toCalendarSystem: DayjsConstructor["toCalendarSystem"];
  const fromCalendarSystem: DayjsConstructor["fromCalendarSystem"];
}

interface CalendarSystemBase {
  daysInMonth(year: number, month: number): number;
  startOf(year: number, month: number, day: number, units: OpUnitType): Dayjs;
  endOf(year: number, month: number, day: number, units: OpUnitType): Dayjs;
  convertToGregorian(year: number, month: number, day: number): { year: number, month: number, day: number };
  convertFromGregorian(date: Date | DateLikeObject | DayjsLikeObject | string | number | undefined | null): { year: number; month: number; day: number; };
  localeOverride(locale: string): Object;
}

declare const calendarSystemsPlugin: PluginFunc;
export = calendarSystemsPlugin;