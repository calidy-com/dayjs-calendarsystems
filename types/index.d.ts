import { PluginFunc, Dayjs } from 'dayjs';
import { CalendarSystemBase } from './calendarSystems/CalendarSystemBase';
export type CalendarSystem =  'persian' | 'gregorian' | 'islamic' | 'julian' | 'indian' | 'hebrew' | 'ethiopian' | 'coptic' | 'buddhist' | 'japanese' | 'roc' | 'nanakshahi' | 'isoWeek' | 'week' | 'quarter' | 'month' | 'year' | 'decade' | 'century' | 'millennium';

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

declare const calendarSystemsPlugin: PluginFunc;
export = calendarSystemsPlugin;