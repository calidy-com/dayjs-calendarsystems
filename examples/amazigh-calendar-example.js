/**
 * Amazigh (Berber) Calendar System - Usage Examples
 *
 * The Amazigh calendar is the agrarian calendar traditionally used by Berbers (Amazigh people)
 * in North Africa. It is still in use in parts of Algeria, Libya, Tunisia, and Morocco.
 *
 * Features:
 * - Based on the Gregorian calendar structure
 * - New Year (Yennayer) falls on January 14
 * - Year 2974 Amazigh = Year 2024 Gregorian
 * - Origin: 950 BCE (ascension of Shoshenq I to Egyptian throne)
 * - 12 months following Gregorian month lengths
 * - Week starts on Monday
 * - Used for agricultural and cultural purposes
 *
 * @file amazigh-calendar-example.js
 * @requires dayjs
 * @requires dayjs-calendarsystems
 */

const dayjs = require('dayjs');
require('../src/index'); // Load the calendar systems plugin

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Amazigh (Berber) Calendar System - Comprehensive Usage Examples');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ============================================================================
// Example 1: Get Today's Date in Amazigh Calendar
// ============================================================================
console.log('Example 1: Today\'s Date in Amazigh Calendar');
console.log('─'.repeat(70));

const today = dayjs();
const todayAmazigh = today.calendar('amazigh');

console.log(`Gregorian Date: ${today.format('MMMM D, YYYY (dddd)')}`);
console.log(`Amazigh Date: ${todayAmazigh.format('MMMM D, YYYY')}`);
console.log(`Amazigh Year: ${todayAmazigh.year()}`);
console.log(`Amazigh Month: ${todayAmazigh.format('MMMM')} (index: ${todayAmazigh.month()})`);
console.log(`Amazigh Day: ${todayAmazigh.date()}`);
console.log(`Day of Week: ${todayAmazigh.format('dddd')}`);
console.log();

// ============================================================================
// Example 2: Yennayer - Amazigh New Year
// ============================================================================
console.log('Example 2: Yennayer - Amazigh New Year Celebrations');
console.log('─'.repeat(70));

// Yennayer always falls on January 14 in the Gregorian calendar
const yennayer2024 = dayjs('2024-01-14');
const yennayer2024Amazigh = yennayer2024.calendar('amazigh');

console.log('Yennayer 2974 (Amazigh New Year):');
console.log(`  Gregorian: ${yennayer2024.format('MMMM D, YYYY')}`);
console.log(`  Amazigh: ${yennayer2024Amazigh.format('MMMM D, YYYY')}`);
console.log();

const yennayer2025 = dayjs('2025-01-14');
const yennayer2025Amazigh = yennayer2025.calendar('amazigh');

console.log('Yennayer 2975 (Next Amazigh New Year):');
console.log(`  Gregorian: ${yennayer2025.format('MMMM D, YYYY')}`);
console.log(`  Amazigh: ${yennayer2025Amazigh.format('MMMM D, YYYY')}`);
console.log();

console.log('Cultural Significance:');
console.log('  • Yennayer marks the beginning of the agricultural year');
console.log('  • Celebrated with traditional dishes like couscous and dried fruits');
console.log('  • Symbol of Berber identity and cultural heritage');
console.log('  • Recognized as an official holiday in Algeria (since 2018)');
console.log();

// ============================================================================
// Example 3: Amazigh Month Names
// ============================================================================
console.log('Example 3: Amazigh Month Names');
console.log('─'.repeat(70));

const amazighMonths = [
  { name: 'Yennayer', gregorian: 'January', meaning: 'First month (New Year)' },
  { name: 'Furar', gregorian: 'February', meaning: 'Flowering month' },
  { name: 'Meghres', gregorian: 'March', meaning: 'Month of the shepherd' },
  { name: 'Yebrir', gregorian: 'April', meaning: 'Month of spring' },
  { name: 'Mayyu', gregorian: 'May', meaning: 'Month of bloom' },
  { name: 'Yunyu', gregorian: 'June', meaning: 'Month of harvest' },
  { name: 'Yulyu', gregorian: 'July', meaning: 'Month of heat' },
  { name: 'Ghuct', gregorian: 'August', meaning: 'Month of high heat' },
  { name: 'Cutenber', gregorian: 'September', meaning: 'Month of sowing' },
  { name: 'Ktuber', gregorian: 'October', meaning: 'Month of autumn' },
  { name: 'Nunember', gregorian: 'November', meaning: 'Month of rain' },
  { name: 'Dujember', gregorian: 'December', meaning: 'Month of cold' },
];

console.log('Amazigh calendar months (agricultural cycle):');
amazighMonths.forEach((month, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${month.name.padEnd(10)} (${month.gregorian}) - ${month.meaning}`);
});
console.log();

// ============================================================================
// Example 4: Historical Significance - Year Zero
// ============================================================================
console.log('Example 4: Historical Significance - Year Zero (950 BCE)');
console.log('─'.repeat(70));

console.log('The Amazigh calendar starts from 950 BCE, commemorating:');
console.log('  • Ascension of Shoshenq I (Berber origin) to Egyptian throne');
console.log('  • Foundation of the 22nd Dynasty of Egypt');
console.log('  • First recorded Berber achievement in ancient history');
console.log();

// Calculate the offset
const currentYear = dayjs().year();
const currentAmazighYear = todayAmazigh.year();
const yearOffset = currentAmazighYear - currentYear;

console.log('Year Conversion:');
console.log(`  Gregorian Year: ${currentYear}`);
console.log(`  Amazigh Year: ${currentAmazighYear}`);
console.log(`  Offset: +${yearOffset} years`);
console.log();

// ============================================================================
// Example 5: Converting Between Calendars
// ============================================================================
console.log('Example 5: Converting Between Calendars');
console.log('─'.repeat(70));

// Gregorian to Amazigh
const gregorianDate = dayjs('2024-07-20');
const amazighDate = gregorianDate.calendar('amazigh');
console.log('Gregorian → Amazigh:');
console.log(`  ${gregorianDate.format('MMMM D, YYYY')} → ${amazighDate.format('MMMM D, YYYY')}`);
console.log();

// Amazigh to Gregorian (setting a specific Amazigh date)
const specificAmazigh = dayjs().calendar('amazigh').year(2974).month(0).date(1); // Yennayer 1, 2974
const backToGregorian = specificAmazigh.calendar('gregory');
console.log('Amazigh → Gregorian:');
console.log(`  Yennayer 1, 2974 → ${backToGregorian.format('MMMM D, YYYY')}`);
console.log();

// Chain conversions: Gregorian → Amazigh → Hebrew
const gregorianStart = dayjs('2024-03-21');
const viaAmazigh = gregorianStart.calendar('amazigh');
const toHebrew = viaAmazigh.calendar('hebrew');
console.log('Gregorian → Amazigh → Hebrew:');
console.log(`  ${gregorianStart.format('YYYY-MM-DD')} (Gregorian)`);
console.log(`  → ${viaAmazigh.format('MMMM D, YYYY')} (Amazigh)`);
console.log(`  → ${toHebrew.format('MMMM D, YYYY')} (Hebrew)`);
console.log();

// ============================================================================
// Example 6: Agricultural Calendar Usage
// ============================================================================
console.log('Example 6: Agricultural Calendar - Seasonal Activities');
console.log('─'.repeat(70));

const agriculturalActivities = [
  { date: '2024-01-14', activity: 'Yennayer - Plan agricultural year' },
  { date: '2024-02-15', activity: 'Furar - Pruning season begins' },
  { date: '2024-03-20', activity: 'Meghres - Shepherd activities, spring pasture' },
  { date: '2024-04-15', activity: 'Yebrir - Spring planting of vegetables' },
  { date: '2024-05-20', activity: 'Mayyu - Fruit trees in bloom' },
  { date: '2024-06-21', activity: 'Yunyu - Grain harvest begins' },
  { date: '2024-07-25', activity: 'Yulyu - Peak heat, irrigation important' },
  { date: '2024-08-15', activity: 'Ghuct - Late summer harvest' },
  { date: '2024-09-20', activity: 'Cutenber - Sowing of winter crops' },
  { date: '2024-10-15', activity: 'Ktuber - Olive harvest' },
  { date: '2024-11-10', activity: 'Nunember - Rainy season preparation' },
  { date: '2024-12-15', activity: 'Dujember - Winter rest period' },
];

console.log('Traditional Agricultural Calendar:');
agriculturalActivities.forEach(item => {
  const gregDate = dayjs(item.date);
  const amazighDate = gregDate.calendar('amazigh');
  console.log(`  ${amazighDate.format('MMMM D, YYYY')}: ${item.activity}`);
});
console.log();

// ============================================================================
// Example 7: Leap Year Handling
// ============================================================================
console.log('Example 7: Leap Year Handling');
console.log('─'.repeat(70));

console.log('Amazigh calendar follows Gregorian leap year rules:');
console.log('  • Leap year if divisible by 4');
console.log('  • Exception: Century years must be divisible by 400');
console.log();

const yearsToCheck = [2973, 2974, 2975, 2976, 2977, 2978];
yearsToCheck.forEach(year => {
  const testDate = dayjs().calendar('amazigh').year(year).month(0).date(1);
  const isLeap = testDate.calendarSystem.isLeapYear(year);
  const gregorianYear = year - 950;

  console.log(`Amazigh Year ${year} (Gregorian ${gregorianYear}):`);
  console.log(`  Leap year: ${isLeap ? 'Yes (366 days)' : 'No (365 days)'}`);
  console.log();
});

// ============================================================================
// Example 8: Cultural Events and Celebrations
// ============================================================================
console.log('Example 8: Cultural Events and Celebrations');
console.log('─'.repeat(70));

const culturalEvents = [
  {
    name: 'Yennayer (New Year)',
    date: '2024-01-14',
    description: 'Most important Amazigh celebration'
  },
  {
    name: 'Tafsut (Spring Festival)',
    date: '2024-04-20',
    description: 'Celebration of spring and renewal'
  },
  {
    name: 'Imnsi n tfsut (Spring Dinner)',
    date: '2024-05-01',
    description: 'Traditional spring feast'
  },
];

console.log('Major Amazigh Cultural Celebrations:');
culturalEvents.forEach(event => {
  const gregDate = dayjs(event.date);
  const amazighDate = gregDate.calendar('amazigh');
  console.log(`\n${event.name}:`);
  console.log(`  Gregorian: ${gregDate.format('MMMM D, YYYY')}`);
  console.log(`  Amazigh: ${amazighDate.format('MMMM D, YYYY')}`);
  console.log(`  ${event.description}`);
});
console.log();

// ============================================================================
// Example 9: Date Arithmetic in Amazigh Calendar
// ============================================================================
console.log('Example 10: Date Arithmetic in Amazigh Calendar');
console.log('─'.repeat(70));

const startAmazigh = dayjs().calendar('amazigh');

// Add days
const plus45Days = startAmazigh.add(45, 'day');
console.log('Add 45 days:');
console.log(`  Start: ${startAmazigh.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus45Days.format('MMMM D, YYYY')}`);
console.log();

// Add months
const plus6Months = startAmazigh.add(6, 'month');
console.log('Add 6 months:');
console.log(`  Start: ${startAmazigh.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus6Months.format('MMMM D, YYYY')}`);
console.log();

// Add years
const plus5Years = startAmazigh.add(5, 'year');
console.log('Add 5 years:');
console.log(`  Start: ${startAmazigh.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus5Years.format('MMMM D, YYYY')}`);
console.log();

// Calculate days until next Yennayer
const nextYennayerGreg = dayjs().month(0).date(14);
if (nextYennayerGreg.isBefore(dayjs())) {
  nextYennayerGreg.add(1, 'year');
}
const daysUntilYennayer = nextYennayerGreg.diff(dayjs(), 'day');
console.log(`Days until next Yennayer: ${daysUntilYennayer} days`);
console.log();

// ============================================================================
// Example 10: Working with Different Locales
// ============================================================================
console.log('Example 10: Geographic Spread of Amazigh Calendar');
console.log('─'.repeat(70));

console.log('The Amazigh calendar is used across North Africa:');
console.log();

const regions = [
  { country: 'Morocco', population: '~12-13 million Amazigh speakers', status: 'Official language' },
  { country: 'Algeria', population: '~9-10 million Amazigh speakers', status: 'Official language, Yennayer is public holiday' },
  { country: 'Tunisia', population: '~1-2 million Amazigh speakers', status: 'Recognized minority' },
  { country: 'Libya', population: '~600,000 Amazigh speakers', status: 'Recognized language' },
  { country: 'Mauritania', population: '~150,000 Amazigh speakers', status: 'Minority language' },
  { country: 'Egypt', population: '~50,000 Siwa Berbers', status: 'Minority language' },
];

regions.forEach(region => {
  console.log(`${region.country}:`);
  console.log(`  Population: ${region.population}`);
  console.log(`  Status: ${region.status}`);
  console.log();
});

// ============================================================================
// Summary
// ============================================================================
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Summary: Amazigh Calendar Key Features');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('');
console.log('✓ Solar calendar based on Gregorian structure');
console.log('✓ Year 1 = 950 BCE (Shoshenq I becomes pharaoh)');
console.log('✓ New Year (Yennayer) on January 14');
console.log('✓ 12 months with agricultural significance');
console.log('✓ Follows Gregorian leap year rules');
console.log('✓ Used primarily for agricultural planning');
console.log('✓ Strong cultural and identity significance');
console.log('✓ Official holiday in Algeria since 2018');
console.log('✓ Week starts on Monday');
console.log('✓ Month names reflect agricultural activities');
console.log('');
console.log('For more information:');
console.log('• https://en.wikipedia.org/wiki/Berber_calendar');
console.log('• https://en.wikipedia.org/wiki/Yennayer');
console.log('');
