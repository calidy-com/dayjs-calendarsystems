/**********************************************************************************
* @see      : https://stackoverflow.com/questions/71222556/how-to-convert-any-of-the-5-islamic-hijri-calendars-dates-to-any-of-18-world
* @function  : hijriToCalendars(year, month, day, [options])
*
* @purpose   : Converts Islamic (Hijri) Date to other Calendars' Dates.
*              Handles Hijri dates from -280,803 AH to +281,510 AH.
*              Handles all 5 Islamic Calendar Types.
*              Uses the 'JS Calendar Conversion by Target Approximation' Method.
*              No external libraries or complex mathematical/astronomical formulas.
*
* @version   : 1.00
* @author    : Mohsen Alyafei
* @date      : 21 Feb 2022
* @licence   : MIT
* @param     : year   : (numeric) [required] Hijri year  (-280803 to 281510)
* @param     : month  : (numeric) [required] hijri month (1 to 12) note: months is standard 1 based
* @param     : day    : (numeric) [required] hijri day   (1 to 29/30)
* @param     : options: Object with the following optional parameters:
*
*              'fromCal': Specifies the the type of input Islamic Calendar with 5 options:
*                         - 'islamic-umalqura' (default)
*                         - 'islamic-civil'
*                         - 'islamic-tbla'
*                         - 'islamic-rgsa'
*                         - 'islamic'
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



//**********************************************************************************
function hijriToCalendars(year, month, day, op={}) {
    op.fromCal ??= "islamic-umalqura";   //
   let   gD      = new Date(Date.UTC(2000,0,1));
         gD      = new Date(gD.setUTCDate(gD.getUTCDate() +
                   ~~(227022+(year+(month-1)/12+day/354)*354.367)));
   const gY      = gD.getUTCFullYear(gD)-2000,
         dFormat = new Intl.DateTimeFormat('en-u-ca-' + op.fromCal, {dateStyle:'short', timeZone:'UTC'});
         gD      = new Date(( gY < 0 ? "-" : "+")+("00000" + Math.abs(gY)).slice(-6)+"-"+("0" + (gD.getUTCMonth(gD)+1)).slice(-2)+"-" + ("0" + gD.getUTCDate(gD)).slice(-2));
   let [iM,iD,iY]= [...dFormat.format(gD).split("/")], i=0;
         gD      = new Date(gD.setUTCDate(gD.getUTCDate() +
                   ~~(year*354+month*29.53+day-(iY.split(" ")[0]*354+iM*29.53+iD*1)-2)));
   while (i < 4) {
      [iM,iD,iY] = [...dFormat.format(gD).split("/")];
      if (iD == day && iM == month && iY.split(" ")[0] == year) return formatOutput(gD);
      gD = new Date(gD.setUTCDate(gD.getUTCDate()+1)); i++;
      }
   throw new Error("Invalid "+op.fromCal+" date!");
   function formatOutput(gD){
   return "toCal"in op ? (op.calendar= op.toCal,
       new Intl.DateTimeFormat(op.locale ??= "en", op).format(gD)) : gD;
   }
   }
   //**********************************************************************************
   
   
   
   
   
//    //==========================================================
//    // Test Units
//    //==========================================================
//    console.log("=".repeat(60));
//    console.log("Convert the Hijri (Islamic) Date '1443-07-21' to other calendars:");
//    console.log("input to function ==>: hijriToCalendars(1443,7,21, option)");
//    console.log("=".repeat(60));
   
//    console.log("Default (Gregory) ISO format     : ",hijriToCalendars(1443,7,21)); // convert default islamic-umalqura date to default gregorian date
//    console.log("Gregory 'full' format            : ",hijriToCalendars(1443,7,21,{toCal:"gregory",dateStyle:"full"}));
   
//    console.log("Persian no format                : ",hijriToCalendars(1443,7,21,{toCal:"persian"}));
//    console.log("Persian 'medium' format          : ",hijriToCalendars(1443,7,21,{toCal:"persian",dateStyle:"medium"}));
//    console.log("Persian 'full' format            : ",hijriToCalendars(1443,7,21,{toCal:"persian",dateStyle:"full"}));
//    console.log("Persian 'full' format 'fa' locale: ",hijriToCalendars(1443,7,21,{toCal:"persian",dateStyle:"full",locale:"fa"}));
   
//    console.log("Hebrew no format                 : ",hijriToCalendars(1443,7,21,{toCal:"hebrew"}));
//    console.log("Hebrew 'full' format             : ",hijriToCalendars(1443,7,21,{toCal:"hebrew",dateStyle:"full"}));
//    console.log("Hebrew 'full' format 'ar' locale : ",hijriToCalendars(1443,7,21,{toCal:"hebrew",dateStyle:"full",locale:"ar"}));
   
//    console.log("Indian no format                 : ",hijriToCalendars(1443,7,21,{toCal:"indian"}));
//    console.log("Indian 'medium' format           : ",hijriToCalendars(1443,7,21,{toCal:"indian",dateStyle:"medium"}));
//    console.log("Indian 'full' format             : ",hijriToCalendars(1443,7,21,{toCal:"indian",dateStyle:"full"}));
//    console.log("Indian 'full' format 'hi' locale : ",hijriToCalendars(1443,7,21,{toCal:"indian",dateStyle:"full",locale:"hi"}));
//    console.log("Indian 'full' format 'in' locale : ",hijriToCalendars(1443,7,21,{toCal:"indian",dateStyle:"full",locale:"in"}));
//    console.log("Chinese no format                : ",hijriToCalendars(1443,7,21,{toCal:"chinese"}));
//    console.log("Chinese 'full' format            : ",hijriToCalendars(1443,7,21,{toCal:"chinese",dateStyle:"full"}));
//    console.log("Chinese 'full' format 'zh' locale: ",hijriToCalendars(1443,7,21,{toCal:"chinese",dateStyle:"full",locale:"zh-CN"}));
   
//    console.log("Coptic 'full' format             : ",hijriToCalendars(1443,7,21,{toCal:"coptic",dateStyle:"full"}));
//    console.log("Coptic 'full' format 'ar' locale : ",hijriToCalendars(1443,7,21,{toCal:"coptic",dateStyle:"full",locale:"ar"}));
   
//    console.log("Dangi (Korean) 'full' format     : ",hijriToCalendars(1443,7,21,{toCal:"dangi",dateStyle:"full"}));
//    console.log("R.O.C. (Minguo) 'full' format    : ",hijriToCalendars(1443,7,21,{toCal:"roc",dateStyle:"full"}));
//    console.log("Japanese 'full' format           : ",hijriToCalendars(1443,7,21,{toCal:"japanese",dateStyle:"full"}));
//    console.log("Ethioaa 'full' format            : ",hijriToCalendars(1443,7,21,{toCal:"ethioaa",dateStyle:"full"}));
//    console.log("Ethiopic 'full' format           : ",hijriToCalendars(1443,7,21,{toCal:"ethiopic",dateStyle:"full"}));
//    console.log("Buddhist 'full' format           : ",hijriToCalendars(1443,7,21,{toCal:"buddhist",dateStyle:"full"}));
   
//    //console.log("");
//    console.log("=".repeat(60));
//    console.log("Format the input Hijri Date in different locales without conversion:");
//    console.log("=".repeat(60));
//    console.log("Islamic-umalqura 'ar' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"ar"}));
//    console.log("Islamic-umalqura 'en' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"en"}));
//    console.log("Islamic-umalqura 'fa' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"fa"}));
//    console.log("Islamic-umalqura 'hi' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"hi"}));
//    console.log("Islamic-umalqura 'id' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"id"}));
//    console.log("Islamic-umalqura 'pa' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"pa"}));
//    console.log("Islamic-umalqura 'ma' locale   : ",hijriToCalendars(1443,7,21,{toCal:"islamic-umalqura",dateStyle:"full", locale:"ma"}));
//    console.log("Islamic-cvil 'ar' locale       : ",hijriToCalendars(1443,7,21,{toCal:"islamic-civil",dateStyle:"full", locale:"ar"}));
   
//    //console.log("");
//    console.log("=".repeat(60));
//    console.log("Convert Max Negative and Max Positive Hijri Dates to Gregorian");
//    console.log("=".repeat(60));
//    console.log("Maximum Negative Date : ",hijriToCalendars(-280803,12,22)); // max negative hijri date
//    console.log("Maximum Positive Date : ",hijriToCalendars(281510,12,29));  // max positive hijri date
//    //console.log("=".repeat(60));
   
//    // Other Test Cases
//    var r=0; // test tracker
//    r |= test(1,1,1,{},"0622-07-19T00:00:00.000Z");
//    r |= test(622,7,18,{},"1225-08-02T00:00:00.000Z");
//    r |= test(1443,7,21,{},"2022-02-22T00:00:00.000Z");
//    r |= test(1443,7,14,{},"2022-02-15T00:00:00.000Z");
//    r |= test(1443,9,1,{},"2022-04-02T00:00:00.000Z");
//    r |= test(2000,9,1,{},"2562-09-01T00:00:00.000Z");
//    r |= test(2100,9,1,{},"2659-09-10T00:00:00.000Z");
//    r |= test(2200,9,1,{},"2756-09-17T00:00:00.000Z");
//    r |= test(2300,9,1,{},"2853-09-25T00:00:00.000Z");
//    r |= test(2400,9,1,{},"2950-10-04T00:00:00.000Z");
//    r |= test(2443,9,1,{},"2992-06-22T00:00:00.000Z");
//    r |= test(3443,9,1,{},"3962-09-13T00:00:00.000Z");
//    r |= test(4443,9,1,{},"4932-12-03T00:00:00.000Z");
//    r |= test(5443,9,1,{},"5903-02-23T00:00:00.000Z");
//    r |= test(6443,9,1,{},"6873-05-14T00:00:00.000Z");
//    r |= test(6550,7,14,{},"6977-01-20T00:00:00.000Z");
//    r |= test(7443,9,1,{},"7843-08-05T00:00:00.000Z");
//    r |= test(8443,9,1,{},"8813-10-24T00:00:00.000Z");
//    r |= test(9443,9,1,{},"9784-01-14T00:00:00.000Z");
//    r |= test(10443,9,1,{},"+010754-04-06T00:00:00.000Z");
//    r |= test(150443,9,1,{},"+146585-06-23T00:00:00.000Z");
//    r |= test(1443,4,29,{fromCal:"islamic"},"2021-12-03T00:00:00.000Z");
//    r |= test(1443,7,21,{fromCal:"islamic-civil"},"2022-02-23T00:00:00.000Z");
//    r |= test(1443,7,21,{fromCal:"islamic"},"2022-02-22T00:00:00.000Z");
//    r |= test(102428,4,29,{fromCal:"islamic-civil"},"+099999-11-24T00:00:00.000Z");
//    r |= test(-640, 7, 20,{fromCal:"islamic-civil"},"0001-03-03T00:00:00.000Z");
//    r |= test(-2000,1,1,{},"-001319-02-16T00:00:00.000Z");
//    r |= test(-2020,1,1,{},"-001339-09-22T00:00:00.000Z");
//    r |= test(-6000,1,1,{fromCal:"islamic-tbla"},"-005200-03-27T00:00:00.000Z");
//    r |= test(-6000,1,1,{fromCal:"islamic-rgsa"},"-005200-03-24T00:00:00.000Z");
//    r |= test(-20000,1,1,{},"-018783-02-11T00:00:00.000Z");
//    r |= test(-60000,12,29,{fromCal:"islamic"},"-057591-02-03T00:00:00.000Z");
//    r |= test(-100000,12,20,{fromCal:"islamic"},"-096400-02-08T00:00:00.000Z");
//    r |= test(-116000,1,1,{},"-111925-09-16T00:00:00.000Z");
//    r |= test(-270000,12,29,{fromCal:"islamic"},"-261338-01-15T00:00:00.000Z");
//    r |= test(275000,12,29,{fromCal:"islamic"},"+267434-02-27T00:00:00.000Z");
//    r |= test(-200000,1,1,{},"-193424-12-23T00:00:00.000Z");
//    r |= test(-206779,3,1,{},"-200000-01-01T00:00:00.000Z");
   
//    if (r==0) console.log("✅ All Other Test Cases Passed.");
   //============ test function ============
   function test(Y,M,D,OP,should) {
   let out = hijriToCalendars(Y,M,D,OP);
   out=out.toISOString();
   if (out !== should) {console.log(`${Y},${M},${D} Output   : ${out}\n${Y},${M},${D} Should be: ${should}`);return 1;}
   }