declare function persian_to_jd(year: number, month: number, day: number): number;
declare function gregorian_to_jd(year: number, month: number, day: number): number;
declare function jd_to_gregorian(jd: number): number[];
declare function jd_to_persian(jd: number): number[];

export {
    gregorian_to_jd,
    jd_to_gregorian,
    jd_to_persian,
    persian_to_jd,
};