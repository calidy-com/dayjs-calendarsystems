# Fix for Issue #7: Hijri Calendar Date Discrepancy

## Problem Summary

The Hijri calendar was showing incorrect dates due to using a simple arithmetic Islamic calendar algorithm instead of the more accurate Islamic Umm al-Qura calendar. This caused date discrepancies where dates would be off by several days.

### Root Cause

1. **Wrong Calendar Algorithm**: The original implementation used `jd_to_islamic()` and `islamic_to_jd()` functions from `fourmilabCalendar.js`, which implement a simple tabular/arithmetic Islamic calendar.

2. **islamic vs islamic-umalqura**: There are multiple Islamic calendar variants:
   - **islamic** (arithmetic/tabular): A simplified calculation-based calendar
   - **islamic-umalqura**: The official calendar used in Saudi Arabia, based on astronomical observations
   - The difference between these can be several days for the same Gregorian date

3. **Intl API Already Declared**: The `HijriCalendarSystem` class already declared it uses `"islamic-umalqura"` for month names (line 21), but the actual date conversions were using the arithmetic algorithm.

## Solution

### Changes Made

1. **Updated `convertFromGregorian()` method** (lines 52-91):
   - Now uses JavaScript's `Intl.DateTimeFormat` with `'en-u-ca-islamic-umalqura'` locale
   - Explicitly uses UTC timezone to avoid timezone-related bugs
   - Parses the formatted date parts to extract year, month, and day
   - This ensures accurate conversions based on the official Umm al-Qura calendar

2. **Updated `convertToGregorian()` method** (lines 95-170):
   - Implements binary search to find the Gregorian date matching a given Hijri date
   - Binary search is necessary because `Intl.DateTimeFormat` only supports one-way conversion (Gregorian → Hijri)
   - Includes a fallback to the old Julian Day method if binary search fails
   - Search range is optimized using the formula: approxYear = Hijri year + 622 + adjustment for year length difference

3. **Updated `convertToJulian()` method** (lines 35-63):
   - Now converts Hijri → Gregorian → Julian Day instead of directly using `islamic_to_jd()`
   - Ensures consistency with the new Umm al-Qura conversions

4. **Updated Tests** (test/HijriCalendarSystem.test.js):
   - Added specific tests for Issue #7 scenarios
   - Added round-trip conversion tests (Gregorian → Hijri → Gregorian)
   - Updated existing tests to reflect islamic-umalqura results
   - Tests now use UTC dates to ensure consistent results across timezones

### Technical Details

#### Before (Arithmetic Calendar)
```javascript
// Old method using arithmetic calendar
const julianDay = CalendarUtils.gregorian_to_jd(...) + timeComponent - 0.5;
const [year, month, day] = CalendarUtils.jd_to_islamic(julianDay);
```

**Result for July 6, 2025**: 1447/1/10 ❌ (incorrect)

#### After (Umm al-Qura via Intl API)
```javascript
// New method using Intl API with islamic-umalqura
const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC'
});
const parts = formatter.formatToParts(utcDate);
// Parse parts to extract year, month, day
```

**Result for July 6, 2025**: 1447/1/11 ✓ (correct according to Umm al-Qura)

## Testing

### Test Cases
1. ✓ July 6, 2025 → 1447/Muharram/11
2. ✓ July 5, 2025 → 1447/Muharram/10
3. ✓ April 14, 2023 → 1444/Ramadan/23
4. ✓ Round-trip conversions preserve dates
5. ✓ Different times of day map to same Hijri date
6. ✓ Binary search correctly inverts the conversion

### Verification
- The fix uses the standard JavaScript `Intl` API which is available in all modern browsers and Node.js
- No external dependencies added
- Backward compatible with existing API (same method signatures)

## Browser/Node.js Support

The `Intl.DateTimeFormat` with `islamic-umalqura` calendar is supported in:
- ✓ Node.js 12+
- ✓ Chrome 24+
- ✓ Firefox 29+
- ✓ Safari 10+
- ✓ Edge 12+

## Performance Considerations

- `convertFromGregorian`: Fast (direct Intl API call)
- `convertToGregorian`: Moderate (binary search with ~11-12 iterations max for ±2 year range)
- Binary search is efficient and predictable: O(log n) where n is the number of days in the search range

## Migration Notes

Users don't need to change their code. The API remains the same, but they will now get more accurate Hijri dates that match official calendars used in Islamic countries.

### Breaking Changes
⚠️ **Date values will change** for some Gregorian dates because we're now using the correct calendar. If you were relying on the old arithmetic calendar values, you'll need to update your test fixtures or expected values.

## References

- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [Unicode CLDR: Islamic Calendar](https://github.com/unicode-org/cldr/blob/main/docs/ldml/tr35-dates.md#islamic-calendar)
- [Umm al-Qura Calendar](https://www.ummulqura.org.sa/)
