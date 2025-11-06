/**
 * Chinese Calendar System - Usage Examples
 *
 * The Chinese calendar is a lunisolar calendar that has been used for over 2000 years.
 * It is still widely used to determine festivals, auspicious dates, and traditional
 * Chinese holidays.
 *
 * Features:
 * - Lunisolar: based on both lunar phases (months) and solar year
 * - 12 or 13 months per year (leap months added ~7 times in 19 years)
 * - Each month has 29 or 30 days based on lunar cycle
 * - Years are identified using the sexagenary cycle (60-year cycle)
 * - 12 zodiac animals rotate every year
 * - New Year (Spring Festival) typically between January 21 and February 20
 *
 * @file chinese-calendar-example.js
 * @requires dayjs
 * @requires dayjs-calendarsystems
 */

const dayjs = require('dayjs');
require('../src/index');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Chinese Calendar System - Comprehensive Usage Examples');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ============================================================================
// Example 1: Today's Date in Chinese Calendar
// ============================================================================
console.log('Example 1: Today\'s Date in Chinese Calendar');
console.log('─'.repeat(70));

const today = dayjs();
const todayChinese = today.calendar('chinese');

console.log(`Gregorian: ${today.format('MMMM D, YYYY (dddd)')}`);
console.log(`Chinese: ${todayChinese.format('YYYY-MM-DD')}`);
console.log(`Chinese Year: ${todayChinese.year()}`);
console.log(`Chinese Month: ${todayChinese.format('MMMM')}`);
console.log(`Chinese Day: ${todayChinese.date()}`);
console.log();

// ============================================================================
// Example 2: Chinese New Year (Spring Festival)
// ============================================================================
console.log('Example 2: Chinese New Year (Spring Festival)');
console.log('─'.repeat(70));

const cny2024 = dayjs('2024-02-10'); // Year of the Dragon
const cny2024Chinese = cny2024.calendar('chinese');

console.log('Chinese New Year 2024:');
console.log(`  Gregorian: ${cny2024.format('MMMM D, YYYY')}`);
console.log(`  Chinese: ${cny2024Chinese.format('YYYY年 M月 D日')}`);
console.log(`  Zodiac: Year of the Dragon (龍年)`);
console.log();

const cny2025 = dayjs('2025-01-29'); // Year of the Snake
console.log('Chinese New Year 2025:');
console.log(`  Gregorian: ${cny2025.format('MMMM D, YYYY')}`);
console.log(`  Zodiac: Year of the Snake (蛇年)`);
console.log();

// ============================================================================
// Example 3: The 12 Zodiac Animals
// ============================================================================
console.log('Example 3: The 12 Zodiac Animals (生肖)');
console.log('─'.repeat(70));

const zodiacAnimals = [
  { animal: 'Rat (鼠)', years: '2020, 2032' },
  { animal: 'Ox (牛)', years: '2021, 2033' },
  { animal: 'Tiger (虎)', years: '2022, 2034' },
  { animal: 'Rabbit (兔)', years: '2023, 2035' },
  { animal: 'Dragon (龍)', years: '2024, 2036' },
  { animal: 'Snake (蛇)', years: '2025, 2037' },
  { animal: 'Horse (馬)', years: '2026, 2038' },
  { animal: 'Goat (羊)', years: '2027, 2039' },
  { animal: 'Monkey (猴)', years: '2028, 2040' },
  { animal: 'Rooster (雞)', years: '2029, 2041' },
  { animal: 'Dog (狗)', years: '2030, 2042' },
  { animal: 'Pig (豬)', years: '2031, 2043' },
];

console.log('The 12-year zodiac cycle:');
zodiacAnimals.forEach((zodiac, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${zodiac.animal.padEnd(20)} - ${zodiac.years}`);
});
console.log();

// ============================================================================
// Example 4: Sexagenary Cycle (天干地支)
// ============================================================================
console.log('Example 4: Sexagenary Cycle - 60-Year Cycle');
console.log('─'.repeat(70));

console.log('The Chinese calendar uses a 60-year cycle combining:');
console.log('  • 10 Heavenly Stems (天干): Jiǎ, Yǐ, Bǐng, Dīng, Wù, Jǐ, Gēng, Xīn, Rén, Guǐ');
console.log('  • 12 Earthly Branches (地支): Zǐ, Chǒu, Yín, Mǎo, Chén, Sì, Wǔ, Wèi, Shēn, Yǒu, Xū, Hài');
console.log();

console.log('Example years and their cycles:');
console.log('  2020: Gēng-Zǐ (庚子) - Metal Rat');
console.log('  2021: Xīn-Chǒu (辛丑) - Metal Ox');
console.log('  2022: Rén-Yín (壬寅) - Water Tiger');
console.log('  2023: Guǐ-Mǎo (癸卯) - Water Rabbit');
console.log('  2024: Jiǎ-Chén (甲辰) - Wood Dragon');
console.log();

// ============================================================================
// Example 5: Lunar Months and Leap Months
// ============================================================================
console.log('Example 5: Lunar Months and Leap Months');
console.log('─'.repeat(70));

console.log('Chinese calendar structure:');
console.log('  • Regular year: 12 months (353-355 days)');
console.log('  • Leap year: 13 months (383-385 days)');
console.log('  • Each month: 29 or 30 days (one lunar cycle)');
console.log('  • Leap months: inserted ~7 times in 19 years');
console.log();

console.log('Traditional month names:');
const monthNames = [
  '正月 (Zhēngyuè) - First Month',
  '二月 (Èryuè) - Second Month',
  '三月 (Sānyuè) - Third Month',
  '四月 (Sìyuè) - Fourth Month',
  '五月 (Wǔyuè) - Fifth Month',
  '六月 (Liùyuè) - Sixth Month',
  '七月 (Qīyuè) - Seventh Month',
  '八月 (Bāyuè) - Eighth Month',
  '九月 (Jiǔyuè) - Ninth Month',
  '十月 (Shíyuè) - Tenth Month',
  '十一月 (Shíyīyuè) - Eleventh Month',
  '腊月 (Làyuè) - Twelfth Month',
];
monthNames.forEach((name, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${name}`);
});
console.log();

// ============================================================================
// Example 6: Converting Between Calendars
// ============================================================================
console.log('Example 6: Converting Between Calendars');
console.log('─'.repeat(70));

// Gregorian to Chinese
const christmas2024 = dayjs('2024-12-25');
const christmas2024Chinese = christmas2024.calendar('chinese');
console.log('Western Christmas → Chinese Calendar:');
console.log(`  Gregorian: ${christmas2024.format('MMMM D, YYYY')}`);
console.log(`  Chinese: ${christmas2024Chinese.format('YYYY-MM-DD')}`);
console.log();

// Important dates
const springFestival = dayjs('2024-02-10');
const midAutumnFestival = dayjs('2024-09-17');

console.log('Spring Festival (Chinese New Year):');
console.log(`  Gregorian: ${springFestival.format('MMMM D, YYYY')}`);
console.log();

console.log('Mid-Autumn Festival (Moon Festival):');
console.log(`  Gregorian: ${midAutumnFestival.format('MMMM D, YYYY')}`);
console.log(`  Chinese: 15th day of 8th month`);
console.log();

// ============================================================================
// Example 7: Traditional Chinese Festivals
// ============================================================================
console.log('Example 7: Traditional Chinese Festivals');
console.log('─'.repeat(70));

const festivals = [
  { name: 'Spring Festival (春節)', date: 'Month 1, Day 1', gregorian: '2024-02-10' },
  { name: 'Lantern Festival (元宵節)', date: 'Month 1, Day 15', gregorian: '2024-02-24' },
  { name: 'Dragon Boat Festival (端午節)', date: 'Month 5, Day 5', gregorian: '2024-06-10' },
  { name: 'Qixi Festival (七夕)', date: 'Month 7, Day 7', gregorian: '2024-08-10' },
  { name: 'Mid-Autumn Festival (中秋節)', date: 'Month 8, Day 15', gregorian: '2024-09-17' },
  { name: 'Double Ninth Festival (重陽節)', date: 'Month 9, Day 9', gregorian: '2024-10-11' },
];

console.log('Major Chinese festivals (2024):');
festivals.forEach(festival => {
  console.log(`\n${festival.name}:`);
  console.log(`  Chinese Date: ${festival.date}`);
  console.log(`  Gregorian Date: ${festival.gregorian}`);
});
console.log();

// ============================================================================
// Example 8: Solar Terms (節氣)
// ============================================================================
console.log('Example 8: Solar Terms (二十四節氣)');
console.log('─'.repeat(70));

console.log('The Chinese calendar includes 24 solar terms:');
console.log('');
console.log('Spring (春):');
console.log('  1. 立春 (Lìchūn) - Start of Spring - Feb 4');
console.log('  2. 雨水 (Yǔshuǐ) - Rain Water - Feb 19');
console.log('  3. 驚蟄 (Jīngzhé) - Awakening of Insects - Mar 5');
console.log('  4. 春分 (Chūnfēn) - Spring Equinox - Mar 20');
console.log('  5. 清明 (Qīngmíng) - Pure Brightness - Apr 4');
console.log('  6. 穀雨 (Gǔyǔ) - Grain Rain - Apr 20');
console.log();

console.log('Summer (夏):');
console.log('  7. 立夏 (Lìxià) - Start of Summer - May 5');
console.log('  8. 小滿 (Xiǎomǎn) - Grain Buds - May 21');
console.log('  9. 芒種 (Mángzhòng) - Grain in Ear - Jun 5');
console.log('  10. 夏至 (Xiàzhì) - Summer Solstice - Jun 21');
console.log('  11. 小暑 (Xiǎoshǔ) - Slight Heat - Jul 7');
console.log('  12. 大暑 (Dàshǔ) - Great Heat - Jul 23');
console.log();

console.log('Fall (秋):');
console.log('  13. 立秋 (Lìqiū) - Start of Autumn - Aug 7');
console.log('  14. 處暑 (Chǔshǔ) - End of Heat - Aug 23');
console.log('  15. 白露 (Báilù) - White Dew - Sep 7');
console.log('  16. 秋分 (Qiūfēn) - Autumn Equinox - Sep 23');
console.log('  17. 寒露 (Hánlù) - Cold Dew - Oct 8');
console.log('  18. 霜降 (Shuāngjiàng) - Descent of Frost - Oct 23');
console.log();

console.log('Winter (冬):');
console.log('  19. 立冬 (Lìdōng) - Start of Winter - Nov 7');
console.log('  20. 小雪 (Xiǎoxuě) - Slight Snow - Nov 22');
console.log('  21. 大雪 (Dàxuě) - Great Snow - Dec 7');
console.log('  22. 冬至 (Dōngzhì) - Winter Solstice - Dec 22');
console.log('  23. 小寒 (Xiǎohán) - Slight Cold - Jan 6');
console.log('  24. 大寒 (Dàhán) - Great Cold - Jan 20');
console.log();

// ============================================================================
// Example 9: Date Arithmetic
// ============================================================================
console.log('Example 9: Date Arithmetic in Chinese Calendar');
console.log('─'.repeat(70));

const startChinese = dayjs().calendar('chinese');

// Add 30 days (approximately one lunar month)
const plus30Days = startChinese.add(30, 'day');
console.log('Add 30 days (~ one lunar month):');
console.log(`  Start: ${startChinese.format('YYYY-MM-DD')}`);
console.log(`  Result: ${plus30Days.format('YYYY-MM-DD')}`);
console.log();

// Add 12 months (approximately one year)
const plus12Months = startChinese.add(12, 'month');
console.log('Add 12 months (~ one year):');
console.log(`  Start: ${startChinese.format('YYYY-MM-DD')}`);
console.log(`  Result: ${plus12Months.format('YYYY-MM-DD')}`);
console.log();

// ============================================================================
// Example 10: Cultural Context and Usage
// ============================================================================
console.log('Example 10: Cultural Context and Usage');
console.log('─'.repeat(70));

console.log('Where is the Chinese calendar used?');
console.log();

console.log('China:');
console.log('  • Population: ~1.4 billion');
console.log('  • Used for traditional festivals and holidays');
console.log('  • Gregorian calendar is official for daily use');
console.log('  • Chinese calendar determines public holidays');
console.log();

console.log('Other regions:');
console.log('  • Taiwan, Hong Kong, Macau');
console.log('  • Singapore, Malaysia (Chinese communities)');
console.log('  • Vietnam (similar calendar called Âm lịch)');
console.log('  • Korea (traditional calendar Eumnyeok)');
console.log('  • Japan (historical use before 1873)');
console.log();

console.log('Modern applications:');
console.log('  • Determining auspicious dates for weddings');
console.log('  • Selecting dates for business openings');
console.log('  • Agricultural planning');
console.log('  • Traditional medicine (Chinese herbs)');
console.log('  • Feng Shui consultations');
console.log('  • Chinese astrology and fortune telling');
console.log();

// ============================================================================
// Summary
// ============================================================================
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Summary: Chinese Calendar Key Features');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('');
console.log('✓ Lunisolar calendar (lunar months + solar year alignment)');
console.log('✓ 12 or 13 months per year (leap months ~7 times in 19 years)');
console.log('✓ 29 or 30 days per month (lunar cycle)');
console.log('✓ 60-year sexagenary cycle (Heavenly Stems + Earthly Branches)');
console.log('✓ 12 zodiac animals rotating yearly');
console.log('✓ New Year between January 21 and February 20');
console.log('✓ 24 solar terms guide agricultural activities');
console.log('✓ Used by over 1.5 billion people worldwide');
console.log('✓ Rich cultural significance for festivals and traditions');
console.log('✓ Over 2000 years of continuous use');
console.log('');
console.log('For more information:');
console.log('• https://en.wikipedia.org/wiki/Chinese_calendar');
console.log('• https://en.wikipedia.org/wiki/Chinese_New_Year');
console.log('• https://en.wikipedia.org/wiki/Chinese_zodiac');
console.log('');
