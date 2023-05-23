declare function gregorian_to_jd(year: number, month: number, day: number): number;
declare function islamic_to_jd(year: number, month: number, day: number): number;
declare function jd_to_gregorian(jd: number): number[];
declare function jd_to_islamic(jd: number): number[];
declare function jd_to_persiana(jd: number): number[];
declare function persiana_to_jd(year: number, month: number, day: number): number;

export {
    gregorian_to_jd,
    islamic_to_jd,
    jd_to_gregorian,
    jd_to_islamic,
    jd_to_persiana,
    persiana_to_jd,
};