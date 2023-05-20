import dayjs from "dayjs";
import "dayjs/locale/fa";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendarSystems from "../src/index";
import GregoryCalendarSystem from "../src/calendarSystems/GregoryCalendarSystem";
import PersianCalendarSystem from "../src/calendarSystems/PersianCalendarSystem";

describe("startOf method with different calendar systems", () => {
  beforeAll(() => {
    dayjs.extend(calendarSystems);
    dayjs.registerCalendarSystem("gregory", new GregoryCalendarSystem());
    dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());
    dayjs.extend(localizedFormat);
  });

  test("should return the correct format", () => {
    const date = dayjs("2023-05-14").toCalendarSystem("persian");
    expect(date.format("YY")).toEqual("02");
    expect(date.format("YYYY")).toEqual("1402");
    expect(date.format("M")).toEqual("2");
    expect(date.format("MM")).toEqual("02");
    expect(date.format("MMM")).toEqual("Ord");
    expect(date.format("MMMM")).toEqual("Ordibehesht");
    expect(date.locale("fa").format("MMMM")).toEqual("اردیبهشت");
    expect(date.format("DD")).toEqual("24");
    expect(date.format("D")).toEqual("24");
    expect(date.format("W")).toEqual("W");
    expect(date.format("HH")).toEqual("00");
    expect(date.format("LL")).toEqual("Ordibehesht 24, 1402");
    expect(date.format("LLL")).toEqual("Ordibehesht 24, 1402 12:00 AM");
    expect(date.format("LLLL")).toEqual(
      "Sunday, Ordibehesht 24, 1402 12:00 AM"
    );
    expect(date.locale("fa").format("LLL")).toEqual("24 اردیبهشت 1402 00:00");
  });
});
