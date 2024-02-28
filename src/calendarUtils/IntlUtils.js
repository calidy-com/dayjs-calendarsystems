/**
 * @fileoverview This file contains utility functions for working with the Intl API.
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 */

const formattersCache = {};
const monthNamesCache = {};
const shiftedSortedMonthNamesCache = {};

/**
 * Returns the localized name of a month.
 * @param {number} monthIndex - The index of the month (0 = January, 11 = December).
 * @param {string} locale - The locale to use.
 * @returns {string} The localized name of the month.
 */
export function getLocalizedMonthName(monthIndex, locale = "en") {
  if (!formattersCache[locale]) {
    formattersCache[locale] = new Intl.DateTimeFormat(locale, {
      month: "long",
    });
  }
  return formattersCache[locale].format(new Date(2023, monthIndex));
}

function getMonthNames(locale, calendar = "persian") {
  const cacheKey = `${locale}-${calendar}`;

  if (!monthNamesCache[cacheKey]) {
    const monthNames = [];
    for (let i = 0; i < 12; i++) {
      if (calendar === "amazigh") {
        // Use the function to get localized Amazigh month names
        monthNames.push(getLocalizedAmazighMonthName(i, locale));
      } else {
        // For other calendars, use Intl.DateTimeFormat
      const date = new Date(2023, i, 1);
      const formatter = new Intl.DateTimeFormat(`${locale}-u-ca-${calendar}`, {
        month: "long",
      });
      monthNames.push(formatter.format(date));
      }
    }
    monthNamesCache[cacheKey] = monthNames;
  }

  return monthNamesCache[cacheKey];
}

function shiftAndSortMonthNames(locale, firstMonthIndex, calendar = "persian") {
  const cacheKey = `${locale}-${firstMonthIndex}-${calendar}`;

  if (!shiftedSortedMonthNamesCache[cacheKey]) {
    let monthNames = getMonthNames(locale, calendar);
    monthNames = [
      ...monthNames.slice(firstMonthIndex),
      ...monthNames.slice(0, firstMonthIndex),
    ];
    shiftedSortedMonthNamesCache[cacheKey] = monthNames;
  }

  return shiftedSortedMonthNamesCache[cacheKey];
}

/**
 * Enhanced utility functions to include locale-specific Amazigh calendar month names in English, Tamazight and Arabic.
 */
// Define Amazigh month names in Tamazight (Tifinagh script), Arabic, and English.
const amazighMonthNamesByLocale = {
  "tzm": [ // Tamazight in Tifinagh script
    "ⵢⴻⵏⵏⴰⵢⴻⵔ", "ⴼⵓⵔⴰⵔ", "ⵎⴻⵖⵔⴻⵙ", "ⵢⴻⴱⵔⵉⵔ", "ⵎⴰⵢⵢⵓ", "ⵢⵓⵏⵢⵓ",
    "ⵢⵓⵍⵢⵓⵣ", "ⵖⵓⵛⵜ", "ⵙⵓⵜⴻⵏⴱⵉⵔ", "ⴽⵜⵓⴱⵔ", "ⵏⵓⵏⴻⵎⴱⵉⵔ", "ⴷⵓⵊⴻⵎⴱⵉⵔ"
  ],
  "ar": [ // Arabic
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ],
  "default": [ // English and other locales
    "Yennayer", "Furar", "Meghres", "Yebrir", "Mayyu", "Yunyu",
    "Yulyu", "Ghuct", "Cutenber", "Ktuber", "Nunember", "Dujember"
  ]
};

/**
 * Returns the localized name of a month for the Amazigh calendar based on the locale.
 * @param {number} monthIndex - The index of the month (0 = Yennayer, 11 = Dujember).
 * @param {string} locale - The locale code (e.g., "tzm" for Tamazight, "ar" for Arabic).
 * @returns {string} The localized name of the month.
 */
function getLocalizedAmazighMonthName(monthIndex, locale) {
  // Determine which set of month names to use based on the locale
  if (amazighMonthNamesByLocale[locale]) {
    return amazighMonthNamesByLocale[locale][monthIndex];
  } else {
    // Default to English if the locale is not specifically handled
    return amazighMonthNamesByLocale["default"][monthIndex];
  }
}


export function generateMonthNames(
  locale,
  calendar = "persian",
  firstMonthNameInEnglish = "Farvardin"
) {
  // Generate month names in English as the reference
  const monthsInEnglish = getMonthNames("en", calendar);
  const firstMonthIndex = monthsInEnglish.indexOf(firstMonthNameInEnglish);

  return shiftAndSortMonthNames(locale, firstMonthIndex, calendar);
}
