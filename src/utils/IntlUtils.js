/**
 * @fileoverview This file contains utility functions for working with the Intl API.
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 * 
 */


/**
 * Returns the localized name of a month.
 * @param {number} monthIndex - The index of the month (0 = January, 11 = December).
 * @param {string} locale - The locale to use.
 * @returns {string} The localized name of the month.
 */
export function getLocalizedMonthName(monthIndex, locale = 'en') {
    return new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2023, monthIndex));
}

function getPersianMonthNames(locale) {
    const monthNames = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2023, i, 1);
      const formatter = new Intl.DateTimeFormat(`${locale}-u-ca-persian`, { month: 'long' });
      monthNames.push(formatter.format(date));
    }
    return monthNames;
  }
  
  function shiftAndSortMonthNames(locale, firstMonthIndex) {
    let monthNames = getPersianMonthNames(locale);
    monthNames = [...monthNames.slice(firstMonthIndex), ...monthNames.slice(0, firstMonthIndex)];
    return monthNames;
  }
  
export function generatePersianMonthNames(locale) {
    // Generate month names in English as the reference
    const persianMonthsInEnglish = getPersianMonthNames('en');
    const firstMonthIndex = persianMonthsInEnglish.indexOf('Farvardin');
  
    return shiftAndSortMonthNames(locale, firstMonthIndex);
  }
  