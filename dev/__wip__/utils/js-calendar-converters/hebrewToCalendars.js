/**********************************************************************************
* @function  : hebrewToCalendars(year, month, day, [options])
*
* @purpose   : Converts Hebrew Date to other Calendars' Dates.
*
* @version   : 1.00
* @author    : Calidy.com, Amir Moradi (https://calidy.com/)
* @date      : 17 May 2023
* @licence   : SEE LICENCE FILE LICENSE.md
* @param     : year   : (numeric) [required] Hebrew year
* @param     : month  : (numeric) [required] Hebrew month (1 to 12 or 13)
* @param     : day    : (numeric) [required] Hebrew day   (1 to 29 or 30)
* @param     : options: Object with the following optional parameters:
*
*              'fromCal': Specifies the the type of input Calendar ('hebrew' by default)
*
*              'toCal' : Specifies the the type of output Calendar to convert to with 19 Calendars:
*                        - "gregory" : (default)
*                        - "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic",
*                          "hebrew", "indian", "islamic", "islamic-umalqura", "islamic-tbla",
*                          "islamic-civil", "islamic-rgsa", "iso8601", "japanese", "persian", "roc".
*
*               'dateStyle' Same as used in the Intl.DateTimeFormat() constructor.
*                           If not stated, default output is in Gregorian ISO Format: YYYY:MM:DDTHH:mm:ss.sssZ
*
*               'locale' The BCP 47 language tag for formatting (default is 'en').
*
*               Other options: As used in the Intl.DateTimeFormat() constructor.
*
* @returns   : Return the date in the calendar and format of the specified options.
***********************************************************************************/

function hebrewToCalendars(year, month, day, op={}) {
    op.fromCal ??= "hebrew";
    let gD = new Date(Date.UTC(year - 3761, 8, 7)); // Hebrew New Year in Gregorian calendar
    gD = new Date(gD.setUTCDate(gD.getUTCDate() + ~~((year - 1) * 365.25 + (month - 1) * 30 + day - 1)));
    
    const gY = gD.getUTCFullYear(gD),
          dFormat = new Intl.DateTimeFormat('en-u-ca-' + op.fromCal, {dateStyle:'short', timeZone:'UTC'});
    gD = new Date(( gY < 0 ? "-" : "+") + ("00000" + Math.abs(gY)).slice(-6) + "-" + ("0" + (gD.getUTCMonth(gD) + 1)).slice(-2) + "-" + ("0" + gD.getUTCDate(gD)).slice(-2));
    
    let [iM, iD, iY] = [...dFormat.format(gD).split("/")], i=0;
    gD = new Date(gD.setUTCDate(gD.getUTCDate() + ~~(year * 365 + month * 30 + day - (iY.split(" ")[0] * 365 + iM * 30 + iD * 1) - 2)));
    
    while (i < 4) {
      [iM, iD, iY] = [...dFormat.format(gD).split("/")];
      if (iD == day && iM == month && iY.split(" ")[0] == year) return formatOutput(gD);
      gD = new Date(gD.setUTCDate(gD.getUTCDate() + 1)); i++;
    }
    throw new Error("Invalid " + op.fromCal + " date!");
  
    function formatOutput(gD) {
      return "toCal" in op ? (op.calendar = op.toCal, new Intl.DateTimeFormat(op.locale ??= "en", op).format(gD)) : gD;
    }
  }