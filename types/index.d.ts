import { PluginFunc, Dayjs } from 'dayjs';
import { ILocale } from 'dayjs/locale';

import { CalendarSystemBase } from './calendarSystems/CalendarSystemBase';
// All Calendar Systems known to Intl API (alphabetical order)
// 'buddhist' | 'chinese' | 'coptic' | 'dangi' | 'ethioaa' | 'ethiopic' | 'gregory' | 'hebrew' | 'indian' | 'islamic' | 'islamic-civil' | 'islamic-rgsa' | 'islamic-tbla' | 'islamic-umalqura' | 'islamicc' | 'iso8601' | 'japanese' | 'persian' | 'roc'
// Our supported Calendar Systems (alphabetical order)
export type CalendarSystem = 'gregory' | 'persian';
// TODO: export type CalendarSystem = 'gregory' | 'persian' | 'islamic' | 'islamic-umalqura' | 'hebrew' | 'ethiopic';
// ! Note that we use the default "islamic-umalqura" calendar system for "islamic" calendar system

declare module 'dayjs' {
  interface Dayjs {
    clone(): Dayjs;
    startOf(units: OpUnitType, startOf?: boolean): Dayjs;
    $set(units: OpUnitType, int: number): Dayjs;
    add(number: number, units: OpUnitType): Dayjs;
    date(input?: number): Dayjs | number;
    toCalendarSystem(calendar: CalendarSystem): Dayjs;
    locale(): string
    locale(preset: string | ILocale, object?: Partial<ILocale>): Dayjs
  }
  interface DayjsConstructor {
    registerCalendarSystem(name: CalendarSystem, calendarSystem: CalendarSystemBase): void;
    getRegisteredCalendarSystem(name: string): CalendarSystemBase;
    toCalendarSystem(calendar: CalendarSystem): DayjsConstructor;
    fromCalendarSystem(name: CalendarSystem, year: number, month: number, day: number): Dayjs;
    locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string
    setDefault(timezone?: string): void
  }
  const registerCalendarSystem: DayjsConstructor["registerCalendarSystem"];
  const getRegisteredCalendarSystem: DayjsConstructor["getRegisteredCalendarSystem"];
  const toCalendarSystem: DayjsConstructor["toCalendarSystem"];
  const fromCalendarSystem: DayjsConstructor["fromCalendarSystem"];
  const locale: DayjsConstructor["locale"];
  const setDefault: DayjsConstructor["setDefault"];
}

declare const calendarSystemsPlugin: PluginFunc;
export = calendarSystemsPlugin;