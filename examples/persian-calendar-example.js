/**
 * Persian (Jalali/Shamsi) Calendar System Examples
 *
 * This file demonstrates various use cases for the Persian calendar system
 */

import dayjs from 'dayjs';
import calendarSystems from '../src/index.js';
import PersianCalendarSystem from '../src/calendarSystems/PersianCalendarSystem.js';

// Initialize plugins
dayjs.extend(calendarSystems);

// Register the Persian calendar
dayjs.registerCalendarSystem('persian', new PersianCalendarSystem());

console.log('🇮🇷 Persian Calendar System Examples\n');
console.log('═'.repeat(60));

// Example 1: Current date in Persian calendar
console.log('\n📅 Example 1: Today\'s Date in Persian Calendar');
console.log('─'.repeat(60));
const today = dayjs();
const todayPersian = today.toCalendarSystem('persian');

console.log(`Gregorian Date: ${today.format('MMMM D, YYYY')}`);
console.log(`Persian Date: Year ${todayPersian.$y}, Month ${todayPersian.$M + 1}, Day ${todayPersian.$D}`);
console.log(`Formatted: ${todayPersian.format('YYYY-MM-DD')}`);

// Example 2: Nowruz (Persian New Year)
console.log('\n🌸 Example 2: Nowruz (Persian New Year)');
console.log('─'.repeat(60));

const nowruzDates = [
  '2024-03-20',
  '2023-03-21',
  '2022-03-21',
  '2021-03-20',
];

nowruzDates.forEach(dateStr => {
  const gregorianDate = dayjs(dateStr);
  const persianDate = gregorianDate.toCalendarSystem('persian');
  console.log(`${dateStr} → Persian: ${persianDate.$y}/1/1 (Nowruz)`);
});

// Example 3: Persian month names
console.log('\n📊 Example 3: Persian Month Names');
console.log('─'.repeat(60));

const persianCalendar = dayjs.getRegisteredCalendarSystem('persian');
const monthNames = persianCalendar.monthNames();

console.log('Persian months:');
monthNames.forEach((name, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${name}`);
});

// Example 4: Converting specific dates
console.log('\n🔄 Example 4: Date Conversions');
console.log('─'.repeat(60));

const testDates = [
  '2024-01-01',
  '2024-03-20', // Nowruz
  '2024-12-31',
];

testDates.forEach(dateStr => {
  const gregorian = dayjs(dateStr);
  const persian = gregorian.toCalendarSystem('persian');
  console.log(`${dateStr} → ${persian.$y}/${persian.$M + 1}/${persian.$D}`);
});

// Example 5: Persian leap years
console.log('\n📆 Example 5: Leap Years in Persian Calendar');
console.log('─'.repeat(60));

const testYears = [1399, 1400, 1403, 1404, 1407];
console.log('Year | Leap? | Days in Year');
console.log('-----|-------|-------------');
testYears.forEach(year => {
  const isLeap = persianCalendar.isLeapYear(year);
  const days = isLeap ? 366 : 365;
  console.log(`${year} | ${isLeap ? ' Yes ' : ' No  '} | ${days}`);
});

// Example 6: Historical events in Persian calendar
console.log('\n📜 Example 6: Historical Events');
console.log('─'.repeat(60));

const historicalEvents = [
  { date: '1979-02-11', event: 'Islamic Revolution' },
  { date: '1941-09-16', event: 'Reza Shah Abdication' },
  { date: '1906-08-05', event: 'Constitutional Revolution' },
];

historicalEvents.forEach(({ date, event }) => {
  const gregorian = dayjs(date);
  const persian = gregorian.toCalendarSystem('persian');
  console.log(`${event}:`);
  console.log(`  Gregorian: ${gregorian.format('MMMM D, YYYY')}`);
  console.log(`  Persian: ${persian.$y}/${persian.$M + 1}/${persian.$D}`);
  console.log('');
});

// Example 7: Calculate age in Persian years
console.log('\n🎂 Example 7: Age Calculation');
console.log('─'.repeat(60));

const birthdate = dayjs('1990-05-15');
const birthdatePersian = birthdate.toCalendarSystem('persian');
const agePersianYears = todayPersian.$y - birthdatePersian.$y;

console.log(`Birthdate (Gregorian): ${birthdate.format('MMMM D, YYYY')}`);
console.log(`Birthdate (Persian): ${birthdatePersian.$y}/${birthdatePersian.$M + 1}/${birthdatePersian.$D}`);
console.log(`Age in Gregorian years: ${today.diff(birthdate, 'year')}`);
console.log(`Age in Persian years: ${agePersianYears}`);

// Example 8: Seasonal divisions
console.log('\n🌍 Example 8: Persian Calendar Seasons');
console.log('─'.repeat(60));

const seasons = [
  { name: 'Spring (Bahar)', months: [1, 2, 3] },
  { name: 'Summer (Tabestan)', months: [4, 5, 6] },
  { name: 'Autumn (Paeez)', months: [7, 8, 9] },
  { name: 'Winter (Zemestan)', months: [10, 11, 12] },
];

seasons.forEach(season => {
  console.log(`${season.name}: Months ${season.months.join(', ')}`);
});

// Example 9: Convert from Persian to other calendars
console.log('\n🔄 Example 9: Cross-Calendar Conversions');
console.log('─'.repeat(60));

import HijriCalendarSystem from '../src/calendarSystems/HijriCalendarSystem.js';
dayjs.registerCalendarSystem('hijri', new HijriCalendarSystem());

const nowruz2024 = dayjs('2024-03-20');
const persianNowruz = nowruz2024.toCalendarSystem('persian');
const hijriNowruz = nowruz2024.toCalendarSystem('hijri');

console.log('Nowruz 2024:');
console.log(`  Gregorian: ${nowruz2024.format('YYYY-MM-DD')}`);
console.log(`  Persian: ${persianNowruz.$y}/${persianNowruz.$M + 1}/${persianNowruz.$D}`);
console.log(`  Hijri: ${hijriNowruz.$y}/${hijriNowruz.$M + 1}/${hijriNowruz.$D}`);

// Example 10: Working with Persian dates
console.log('\n⚙️  Example 10: Date Manipulations');
console.log('─'.repeat(60));

const persianDate = dayjs('2024-03-20').toCalendarSystem('persian');
console.log(`Original: ${persianDate.$y}/${persianDate.$M + 1}/${persianDate.$D}`);

const plus30Days = persianDate.add(30, 'day');
console.log(`Plus 30 days: ${plus30Days.$y}/${plus30Days.$M + 1}/${plus30Days.$D}`);

const nextMonth = persianDate.add(1, 'month');
console.log(`Plus 1 month: ${nextMonth.$y}/${nextMonth.$M + 1}/${nextMonth.$D}`);

const nextYear = persianDate.add(1, 'year');
console.log(`Plus 1 year: ${nextYear.$y}/${nextYear.$M + 1}/${nextYear.$D}`);

console.log('\n' + '═'.repeat(60));
console.log('🇮🇷 End of Persian Calendar Examples\n');
