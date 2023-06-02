declare function gregorian_to_jd(year: number, month: number, day: number): number;
declare function hebrew_leap(year: number): boolean;
declare function hebrew_to_jd(year: number, month: number, day: number): number;
declare function islamic_to_jd(year: number, month: number, day: number): number;
declare function jd_to_gregorian(jd: number): number[];
declare function jd_to_hebrew(jd: number): number[];
declare function jd_to_islamic(jd: number): number[];
declare function jd_to_persiana(jd: number): number[];
declare function leap_gregorian(year: number): boolean;
declare function leap_islamic(year: number): boolean;
declare function leap_persiana(year: number): boolean;
declare function persiana_to_jd(year: number, month: number, day: number): number;

export {
    gregorian_to_jd,
    hebrew_leap,
    hebrew_to_jd,
    islamic_to_jd,
    jd_to_gregorian,
    jd_to_hebrew,
    jd_to_islamic,
    jd_to_persiana,
    leap_gregorian,
    leap_islamic,
    leap_persiana,
    persiana_to_jd,
};