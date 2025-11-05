/**
 * Mars Calendar System Examples
 *
 * This file demonstrates various use cases for the Mars/Darian calendar system
 */

import dayjs from 'dayjs';
import calendarSystems from '../src/index.js';
import MarsCalendarSystem from '../src/calendarSystems/MarsCalendarSystem.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

// Initialize plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(calendarSystems);

// Register the Mars calendar
dayjs.registerCalendarSystem('mars', new MarsCalendarSystem());

console.log('🔴 Mars Calendar System Examples\n');
console.log('═'.repeat(60));

// Example 1: Current date on Mars
console.log('\n📅 Example 1: What is today\'s date on Mars?');
console.log('─'.repeat(60));
const today = dayjs();
const todayMars = today.toCalendarSystem('mars');
const marsCalendar = dayjs.getRegisteredCalendarSystem('mars');

console.log(`Earth Date: ${today.format('MMMM D, YYYY')}`);
console.log(`Mars Year: ${todayMars.$y}`);
console.log(`Mars Month: ${marsCalendar.getLocalizedMonthName(todayMars.$M)} (Month ${todayMars.$M + 1})`);
console.log(`Mars Sol: ${todayMars.$D}`);
console.log(`Formatted: ${todayMars.format('YYYY-MM-DD')}`);

// Example 2: Historical Mars missions
console.log('\n🚀 Example 2: Mars Mission Landing Dates');
console.log('─'.repeat(60));

const missions = [
  { name: 'Viking 1', date: '1976-07-20', description: 'First successful Mars lander' },
  { name: 'Pathfinder', date: '1997-07-04', description: 'Delivered Sojourner rover' },
  { name: 'Spirit', date: '2004-01-04', description: 'Explored Gusev crater' },
  { name: 'Opportunity', date: '2004-01-25', description: 'Lasted 14 years!' },
  { name: 'Curiosity', date: '2012-08-06', description: 'Currently exploring Gale crater' },
  { name: 'Perseverance', date: '2021-02-18', description: 'Searching for ancient life' },
];

missions.forEach(mission => {
  const earthDate = dayjs(mission.date);
  const marsDate = earthDate.toCalendarSystem('mars');
  const monthName = marsCalendar.getLocalizedMonthName(marsDate.$M);

  console.log(`\n${mission.name} (${mission.description})`);
  console.log(`  Earth: ${earthDate.format('MMMM D, YYYY')}`);
  console.log(`  Mars:  ${monthName} ${marsDate.$D}, Year ${marsDate.$y}`);
});

// Example 3: Calculate sols since Perseverance landing
console.log('\n⏱️  Example 3: Sols Since Perseverance Landing');
console.log('─'.repeat(60));

const perseveranceLanding = dayjs('2021-02-18');
const perseveranceMars = perseveranceLanding.toCalendarSystem('mars');
const currentMars = dayjs().toCalendarSystem('mars');

const solsSinceLanding = currentMars.diff(perseveranceMars, 'day');
const earthDaysSinceLanding = dayjs().diff(perseveranceLanding, 'day');

console.log(`Landing Date (Earth): ${perseveranceLanding.format('MMMM D, YYYY')}`);
console.log(`Landing Date (Mars): ${marsCalendar.getLocalizedMonthName(perseveranceMars.$M)} ${perseveranceMars.$D}, Year ${perseveranceMars.$y}`);
console.log(`Sols since landing: ${solsSinceLanding}`);
console.log(`Earth days since landing: ${earthDaysSinceLanding}`);
console.log(`Difference: ${solsSinceLanding - earthDaysSinceLanding} extra Earth days`);

// Example 4: Leap years on Mars
console.log('\n📆 Example 4: Mars Leap Years');
console.log('─'.repeat(60));

const testYears = [0, 1, 2, 10, 50, 99, 100, 500];
console.log('Year | Leap? | Sols in Year');
console.log('-----|-------|-------------');
testYears.forEach(year => {
  const isLeap = marsCalendar.isLeapYear(year);
  const sols = marsCalendar.solsInYear(year);
  console.log(`${year.toString().padStart(4)} | ${isLeap ? ' Yes ' : ' No  '} | ${sols}`);
});

// Example 5: Mars month lengths
console.log('\n📊 Example 5: Mars Month Lengths (Year 0 vs Year 1)');
console.log('─'.repeat(60));

console.log('Month | Name           | Sols (Y0) | Sols (Y1 Leap)');
console.log('------|----------------|-----------|---------------');
for (let month = 0; month < 24; month++) {
  const monthName = marsCalendar.getLocalizedMonthName(month).padEnd(14);
  const solsYear0 = marsCalendar.daysInMonth(0, month);
  const solsYear1 = marsCalendar.daysInMonth(1, month);
  const monthNum = (month + 1).toString().padStart(2);

  console.log(`  ${monthNum}  | ${monthName} |    ${solsYear0}     |      ${solsYear1}`);
}

// Example 6: Convert your birthday to Mars
console.log('\n🎂 Example 6: Your Birthday on Mars');
console.log('─'.repeat(60));

const birthdate = dayjs('1990-05-15'); // Change this to your birthday!
const birthdateMars = birthdate.toCalendarSystem('mars');
const ageMarsYears = todayMars.$y - birthdateMars.$y;

console.log(`Earth Birthday: ${birthdate.format('MMMM D, YYYY')}`);
console.log(`Mars Birthday: ${marsCalendar.getLocalizedMonthName(birthdateMars.$M)} ${birthdateMars.$D}, Year ${birthdateMars.$y}`);
console.log(`Age on Earth: ${today.diff(birthdate, 'year')} years`);
console.log(`Age on Mars: ${ageMarsYears} Mars years`);
console.log(`(That's ${(ageMarsYears * 1.88).toFixed(1)} Earth years!)`);

// Example 7: Cross-calendar conversion
console.log('\n🌍 Example 7: Cross-Calendar Date Conversion');
console.log('─'.repeat(60));

// Import other calendars
import PersianCalendarSystem from '../src/calendarSystems/PersianCalendarSystem.js';
import HijriCalendarSystem from '../src/calendarSystems/HijriCalendarSystem.js';

dayjs.registerCalendarSystem('persian', new PersianCalendarSystem());
dayjs.registerCalendarSystem('hijri', new HijriCalendarSystem());

const testDate = dayjs('2024-03-20'); // Persian New Year
console.log(`Original Date: ${testDate.format('MMMM D, YYYY')}`);

const marsDt = testDate.toCalendarSystem('mars');
const persianDt = testDate.toCalendarSystem('persian');
const hijriDt = testDate.toCalendarSystem('hijri');

console.log(`Mars:    Year ${marsDt.$y}, Month ${marsDt.$M + 1}, Sol ${marsDt.$D}`);
console.log(`Persian: Year ${persianDt.$y}, Month ${persianDt.$M + 1}, Day ${persianDt.$D}`);
console.log(`Hijri:   Year ${hijriDt.$y}, Month ${hijriDt.$M + 1}, Day ${hijriDt.$D}`);

// Example 8: Future Mars mission planning
console.log('\n🛸 Example 8: Plan a Future Mars Mission');
console.log('─'.repeat(60));

const missionLaunch = dayjs('2030-07-15');
const missionLanding = missionLaunch.add(7, 'month'); // ~7 months travel time
const missionDuration = 500; // 500 sols on Mars
const missionReturn = missionLanding.add(missionDuration, 'day');

const launchMars = missionLaunch.toCalendarSystem('mars');
const landingMars = missionLanding.toCalendarSystem('mars');
const returnMars = missionReturn.toCalendarSystem('mars');

console.log('Mission Timeline:');
console.log(`Launch:  ${missionLaunch.format('MMMM D, YYYY')} (Earth)`);
console.log(`         ${marsCalendar.getLocalizedMonthName(launchMars.$M)} ${launchMars.$D}, Year ${launchMars.$y} (Mars)`);
console.log(`Landing: ${missionLanding.format('MMMM D, YYYY')} (Earth)`);
console.log(`         ${marsCalendar.getLocalizedMonthName(landingMars.$M)} ${landingMars.$D}, Year ${landingMars.$y} (Mars)`);
console.log(`Return:  ${missionReturn.format('MMMM D, YYYY')} (Earth)`);
console.log(`         ${marsCalendar.getLocalizedMonthName(returnMars.$M)} ${returnMars.$D}, Year ${returnMars.$y} (Mars)`);
console.log(`\nMission Duration: ${missionDuration} sols on Mars surface`);
console.log(`Total Mission: ${missionReturn.diff(missionLaunch, 'month')} Earth months`);

// Example 9: Mars epoch
console.log('\n📜 Example 9: Mars Calendar Epoch');
console.log('─'.repeat(60));

const epochDate = dayjs('1873-12-29T12:09:00Z');
const epochMars = epochDate.toCalendarSystem('mars');

console.log('Mars Calendar Epoch:');
console.log(`Earth Date: ${epochDate.format('MMMM D, YYYY [at] HH:mm [UTC]')}`);
console.log(`Mars Date: ${marsCalendar.getLocalizedMonthName(epochMars.$M)} ${epochMars.$D}, Year ${epochMars.$y}`);
console.log(`Significance: Birth date of astronomer Carl Otto Lampland`);

// Example 10: Time difference demonstration
console.log('\n⏰ Example 10: Sol vs. Day Length Comparison');
console.log('─'.repeat(60));

const solsToCompare = [1, 7, 30, 100, 365];
console.log('Mars Sols | Earth Days | Difference');
console.log('----------|------------|------------');

solsToCompare.forEach(sols => {
  const earthDays = sols * 1.0274912517;
  const diff = earthDays - sols;
  console.log(`${sols.toString().padStart(9)} | ${earthDays.toFixed(2).padStart(10)} | +${diff.toFixed(2)} days`);
});

console.log('\n' + '═'.repeat(60));
console.log('🔴 End of Mars Calendar Examples\n');
