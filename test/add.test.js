import dayjs from "dayjs";
import MockDate from "mockdate";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";
import HijriCalendarSystem from "../src/calendarSystems/HijriCalendarSystem";

const testCalendarSystems = [
  "gregory",
  "persian",
  "islamic",
];

testCalendarSystems.forEach(calendarSystem => {
  describe(`Testing ${calendarSystem} calendar system`, () => {
    let testDayjs;

    beforeAll(() => {
      dayjs.extend(calendarSystems);
      dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
      dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
      dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());
    });
    beforeEach(() => {
      MockDate.set(new Date());
      // Set calendar system
      testDayjs = dayjs().toCalendarSystem(calendarSystem);
    });
    afterEach(() => {
      MockDate.reset();
    });

    it("add 1 day in the middle of the month", () => {
      const date = testDayjs.date(15); // set the date to 15th
      const date2 = date.add(1, "day");
      expect(date2.date()).toEqual(date.date() + 1);
    });

    it("add 1 day at the end of the month", () => {
      const date = testDayjs.endOf("month"); // set the date to the last day of the month
      const date2 = date.add(1, "day");
      expect(date2.month()).toEqual(date.month() + 1);
      expect(date2.date()).toEqual(1);
    });

    it("add 1 month in the middle of the year", () => {
      const date = testDayjs.month(5); // set the month to June
      const date2 = date.add(1, "month");
      expect(date2.month()).toEqual(date.month() + 1);
    });

    it("add 1 month at the end of the year", () => {
      const date = testDayjs.endOf("year");
      const date2 = date.add(1, "month");
      expect(date2.year()).toEqual(date.year() + 1);
      expect(date2.month()).toEqual(0);
    });

    it("add 1 year", () => {
      const date = testDayjs;
      const date2 = date.add(1, "year");
      expect(date2.year()).toEqual(date.year() + 1);
    });

    it("add 11 months in the middle of the year", () => {
      const date = testDayjs.month(5); // set the month to June
      const date2 = date.add(11, "month");
      expect(date2.year()).toEqual(date.year() + 1);
      expect(date2.month()).toEqual(date.month() - 1);
    });

    if (calendarSystem === "persian") {
      it("add 100 days", () => {
        const date = dayjs("2023-03-21").toCalendarSystem(calendarSystem);
        const date2 = date.add(100, "day");
        expect(date2.format("YYYY-MM-DD")).toEqual("1402-04-08");
      });
    }

    it("add 1 month on last day of month", () => {
      const date = testDayjs.endOf("month"); // set the date to the last day of the month
      const date2 = date.add(1, "month");
      expect(date2.month()).toEqual(date.month() + 1);
    });
  });
});
