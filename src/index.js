/**
 * Day.js calendar systems plugin
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 *
 * This plugin allows Day.js to work with different calendar systems.
 */
import GregoryCalendarSystem from "./calendarSystems/GregoryCalendarSystem";

// The built-in calendar systems
const calendarSystems = {};

// Extend Day.js with the Calendar Systems Plugin
export default (options, dayjsClass, dayjsFactory) => {
  let defaultCalendarSystem = "gregory";

  const Utils = dayjsClass.prototype.$utils();

  const wrapper = function (date, instance) {
    // Get all the properties and their values from the instance:
    let properties = {};
    if (instance) {
      properties = Object.keys(instance).reduce((props, key) => {
        if (key === "$L" || key === "locale") {
          props["locale"] = instance[key];
        } else if (key === "$u" || key === "utc") {
          props["utc"] = instance[key];
        } else if (key === "$offset") {
          // nothing here as it causes issues with the UTC and Timezone plugins
          props["$offset"] = instance[key];
        } else if (key === "$x") {
          props["x"] = instance[key];
        } else if (key === "$d") {
          // nothing here as it causes issues with the UTC and Timezone plugins
        } else if (instance[key] !== instance) {
          //props[key] = instance[key];
        }
        return props;
      }, {});
    }

    // Create a new instance of the class with the given date:
    const newInstance = dayjsFactory(date, properties);
    // Add the $x property (used for timezone) to the new instance:
    // if ("$x" in instance) {
    //   newInstance.$x = instance.$x;
    // }
    if (instance && "$C" in instance && instance.$C !== "gregory") {
      // If the calendar system is set, convert the date to the specified calendar system
      const convertedNewInstance = newInstance.toCalendarSystem(instance.$C);
      return convertedNewInstance;
    }
    return newInstance;
  };

  // Register a new calendar system
  dayjsFactory.registerCalendarSystem = (name, calendarSystem) => {
    if (calendarSystem.constructor.typeName !== "CalendarSystemBase") {
      throw new Error("Calendar system must extend CalendarSystemBase");
    }

    calendarSystems[name] = calendarSystem;

    if (typeof calendarSystem.daysInMonth === "function") {
      const originalDaysInMonth = dayjsClass.prototype.daysInMonth;
      dayjsClass.prototype.daysInMonth = function () {
        if (this.$C && this.$C !== "gregory") {
          return calendarSystem.daysInMonth(this.$y, this.$M);
        } else {
          return originalDaysInMonth.call(this);
        }
      };
    }

    if (typeof calendarSystem.startOf === "function") {
      const originalStartOf = dayjsClass.prototype.startOf;
      dayjsClass.prototype.startOf = function (units) {
        if (this.$C && this.$C !== "gregory") {
          return calendarSystem.startOf(this.$y, this.$M, this.$D, units);
        } else {
          return originalStartOf.call(this, units);
        }
      };
    }

    if (typeof calendarSystem.endOf === "function") {
      const originalEndOf = dayjsClass.prototype.endOf;
      dayjsClass.prototype.endOf = function (units) {
        if (this.$C && this.$C !== "gregory") {
          return calendarSystem.endOf(this.$y, this.$M, this.$D, units);
        } else {
          return originalEndOf.call(this, units);
        }
      };
    }

    if (typeof calendarSystem.isLeapYear === "function") {
      const originalIsLeapYear = dayjsClass.prototype.isLeapYear;
      dayjsClass.prototype.isLeapYear = function () {
        if (this.$C && this.$C !== "gregory") {
          return calendarSystem.isLeapYear.call(this);
        } else {
          return originalIsLeapYear.call(this);
        }
      };
    }
  };

  // Get a calendar system from the registry:
  dayjsFactory.getRegisteredCalendarSystem = (name) => {
    if (!calendarSystems[name]) {
      throw new Error(`Calendar system '${name}' is not registered.`);
    }
    return calendarSystems[name];
  };

  const oldInit = dayjsClass.prototype.init;
  dayjsClass.prototype.init = function (options) {
    oldInit.bind(this)(options);
    if (this.$C && this.$C !== "gregory") {
      this.toCalendarSystem(this.$C);
    }
  };
  // Override the default clone method to also clone the calendar system
  dayjsClass.prototype.clone = function () {
    return wrapper(this.$d, this);
  };

  // Override the default startOf method to convert the date to the specified calendar system
  dayjsClass.prototype.startOf = function (units, startOf) {
    // startOf -> endOf
    const isStartOf = !Utils.u(startOf) ? startOf : true;
    const unit = Utils.p(units);
    // /!\ NB: This function expects a 1-indexed month, whereas the internal date representation is 0-indexed
    const instanceFactory = (d, m, y = this.$y) => {
      // if calendar system is not gregorian, convert the date to gregorian
      if ("$C" in this && this.$C !== "gregory") {
        // *.convertToGregorian expects and returns a 0-indexed month
        let convertedDate;
        try {
          convertedDate = calendarSystems[this.$C].convertToGregorian(y, m, d);
          y = convertedDate.year;
          m = convertedDate.month;
          d = convertedDate.day;
        } catch (e) {
          console.log("Error calling convertToGregorian", e);
        }
      }

      const ins = wrapper(
        this.$u ? Date.UTC(y, m, d) : new Date(y, m, d),
        this
      );
      return isStartOf ? ins : ins.endOf("day");
    };

    const instanceFactorySet = (method, slice) => {
      const argumentStart = [0, 0, 0, 0];
      const argumentEnd = [23, 59, 59, 999];
      const ins = wrapper(
        this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          this.$C && this.$C !== "gregory" ? this.$d : this.toDate("s"),
          (isStartOf ? argumentStart : argumentEnd).slice(slice)
        ),
        this
      );
      return ins;
    };
    const { $W, $M, $D } = this;
    const utcPad = `set${this.$u ? "UTC" : ""}`;
    var monthsInYear = 12;
    if (this.$C == "hebrew") {
      if (this.isLeapYear()) {
        monthsInYear = 13;
      } else {
        monthsInYear = 12;
      }
    }
    if (this.$C == "ethiopic"){
      monthsInYear = 13;
    }
    switch (unit) {
      case "year":
        return isStartOf
          ? instanceFactory(1, 0)
          : instanceFactory(
              0,
              0,
              this.$y + 1
            );
      case "month":
        return isStartOf
          ? instanceFactory(1, this.$M)
          : instanceFactory(
              0,
              (this.$M + 1) % monthsInYear,
              this.$y + parseInt((this.$M + 1) / monthsInYear, 10)
            );
      case "week": {
        const weekStart = this.$locale().weekStart || 0;
        const gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case "day":
      case "date":
        return instanceFactorySet(`${utcPad}Hours`, 0);
      case "hour":
        return instanceFactorySet(`${utcPad}Minutes`, 1);
      case "minute":
        return instanceFactorySet(`${utcPad}Seconds`, 2);
      case "second":
        return instanceFactorySet(`${utcPad}Milliseconds`, 3);
      default:
        return this.clone();
    }
  };

  const old$Set = dayjsClass.prototype.$set;
  // Override the default $set method to convert the date to the specified calendar system
  dayjsClass.prototype.$set = function (units, int) {
    const isGregory = !("$C" in this) || this.$C === "gregory";

    if (isGregory) return old$Set.call(this, units, int);

    const { $d, $u, $C, $y, $M, $D, $H, $m, $s, $ms } = this;
    const utcPrefix = $u ? "UTC" : "";
    const setFn = (fn, value) => $d[`set${utcPrefix}${fn}`](value);

    const instanceFactory = (
      d,
      M,
      y = $y,
      h = $H,
      m = $m,
      s = $s,
      ms = $ms
    ) => {
      const { year, month, day } = calendarSystems[$C].convertToGregorian(
        y,
        M,
        d,
        h,
        m,
        s,
        ms
      );

      setFn("FullYear", year);
      setFn("Month", month);
      setFn("Date", day);
      setFn("Hours", h);
      setFn("Minutes", m);
      setFn("Seconds", s);
      setFn("Milliseconds", ms);

      return this;
    };

    const unitSetters = {
      date: () => instanceFactory(int, $M),
      day: () => instanceFactory(int, $M),
      month: () => instanceFactory($D, int),
      year: () => instanceFactory($D, $M, int),
      hour: () => instanceFactory($D, $M, $y, int),
      minute: () => instanceFactory($D, $M, $y, $H, int),
      second: () => instanceFactory($D, $M, $y, $H, $m, int),
      millisecond: () => instanceFactory($D, $M, $y, $H, $m, $s, int),
    };

    if (units in unitSetters) {
      unitSetters[units]();
    } else {
      return old$Set.call(this, units, int);
    }

    this.init();

    return $C !== "gregory" ? this.toCalendarSystem($C) : this;
  };

  // Override the default add method to convert the date to the specified calendar system
  const oldAdd = dayjsClass.prototype.add;
  dayjsClass.prototype.add = function (number, units) {
    number = Number(number); // eslint-disable-line no-param-reassign
    const unit = Utils.p(units);

    if (("$C" in this && this.$C === "gregory") || !("$C" in this)) {
      return oldAdd.bind(this)(number, units);
    }
    const instanceFactorySet = (n) => {
      const convertedDate = calendarSystems[this.$C].convertToGregorian(
        this.$y,
        this.$M,
        this.$D,
        this.$H,
        this.$m,
        this.$s,
        this.$ms
      );
      const d = dayjsFactory(
        convertedDate.year +
          "-" +
          (convertedDate.month + 1) +
          "-" +
          convertedDate.day
      );
      return wrapper(d.date(d.date() + Math.round(n * number)), this);
    };
    var monthsInYear = 12;
    if (this.$C == "hebrew") {
      if (this.isLeapYear()) {
        monthsInYear = 13;
      } else {
        monthsInYear = 12;
      }
    }
    if (this.$C == "ethiopic"){
      monthsInYear = 13;
    }
    if (unit === "month") {
      const n = this.$M + number;
      const y =
        n < 0 ? -Math.ceil(-n / monthsInYear) : parseInt(n / monthsInYear, 10);
      const d = this.$D;
      const x = this.set("day", 1)
        .add(y, "year")
        .set("month", n - y * monthsInYear);
      return x.set("day", Math.min(x.daysInMonth(), d));
      //return this.set("month", this.$M + number);
    }
    if (unit === "year") {
      return this.set("year", this.$y + number);
    }
    if (unit === "day") {
      return instanceFactorySet(1);
    }
    if (unit === "week") {
      return instanceFactorySet(7);
    }
    const step =
      {
        ["minute"]: 60 * 1e3,
        ["hour"]: 60 * 60 * 1e3,
        ["second"]: 1e3,
      }[unit] || 1; // ms

    const nextTimeStamp = this.$d.getTime() + number * step;
    return wrapper(nextTimeStamp, this);
  };

  const oldDate = dayjsClass.prototype.date;
  dayjsClass.prototype.date = function (input) {
    if ("$C" in this && this.$C !== "gregory") {
      return this.$g(input, "$D", "day");
    } else {
      return oldDate.bind(this)(input);
    }
  };

  dayjsFactory.toCalendarSystem = function (calendar) {
    if (!calendarSystems[calendar]) {
      throw new Error(`Calendar system '${calendar}' is not registered.`);
    }
    dayjsFactory.$C = calendar;
    return dayjsFactory;
  };

  // Convert a Day.js instance to a specific calendar system
  dayjsClass.prototype.toCalendarSystem = function (
    calendar = defaultCalendarSystem
  ) {
    if (!calendarSystems[calendar]) {
      throw new Error(`Calendar system '${calendar}' is not registered.`);
    }
    // Clone the current instance
    const newInstance = this.clone();
    // If the instance is not already in the required calendar system, initialize it
    // You would also convert the date to the specified calendar here.
    if (newInstance.$C !== calendar) {
      // if target calendar is gregorian, convert to gregorian, otherwise convert to calendar
      if (calendar === "gregory") {
        const convertedDate = calendarSystems[
          newInstance.$C || "gregory"
        ].convertToGregorian(
          newInstance.$y,
          newInstance.$M,
          newInstance.$D,
          newInstance.$H,
          newInstance.$m,
          newInstance.$s,
          newInstance.$ms
        );
        newInstance.$G_y = convertedDate.year;
        newInstance.$G_M = convertedDate.month;
        newInstance.$G_D = convertedDate.day;
        newInstance.$C_y = convertedDate.year;
        newInstance.$C_M = convertedDate.month;
        newInstance.$C_D = convertedDate.day;
        newInstance.$y = convertedDate.year;
        newInstance.$M = convertedDate.month;
        newInstance.$D = convertedDate.day;
      } else {
        const convertedDate = calendarSystems[calendar].convertFromGregorian(
          this.toDate()
        );
        newInstance.$G_y = newInstance.get("year");
        newInstance.$G_M = newInstance.get("month");
        newInstance.$G_D = newInstance.get("date");
        newInstance.$C_y = convertedDate.year;
        newInstance.$C_M = convertedDate.month;
        newInstance.$C_D = convertedDate.day;
        newInstance.$y = convertedDate.year;
        newInstance.$M = convertedDate.month;
        newInstance.$D = convertedDate.day;
      }

      // Store the target calendar system in $C
      newInstance.$C = calendar;
    }
    // Update the locale to reflect the new calendar system
    dayjsFactory.updateLocale(
      newInstance.$L,
      calendarSystems[calendar].localeOverride(newInstance.$L)
    );
    // dayjsFactory.locale(
    //   newInstance.$L,
    //   {
    //     ...newInstance.$locale(),
    //     ...calendarSystems[calendar].localeOverride(newInstance.$L),
    //   },
    //   true
    // );
    return newInstance;
  };

  // Handle locale inconsistencies if any:
  function handleLocale(preset, object, calendarSystem) {
    const buggyLocales = [
      "ar",
      "ar-dz",
      "ar-iq",
      "ar-kw",
      "ar-ly",
      "ar-ma",
      "ar-sa",
      "ar-tn",
      "fa",
      "he",
    ];
    // We patch some locale dictionaries that have wrongly named months:
    // This is a costly operation, so we only do it for locales that need it.
    if (typeof preset === "string" && buggyLocales.includes(preset)) {
      return dayjsFactory.updateLocale(
        preset,
        calendarSystems[calendarSystem].localeOverride(preset)
      );
    }
    return object;
  }
  const oldLocale = dayjsClass.prototype.locale;
  dayjsClass.prototype.locale = function (preset, object) {
    object = handleLocale(preset, object, this.$C || "gregory");
    return oldLocale.bind(this)(preset, object);
  };

  const oldDayjsFactoryLocale = dayjsFactory.locale;
  dayjsFactory.locale = function (preset, object, isLocal) {
    object = handleLocale(preset, object, defaultCalendarSystem);
    return oldDayjsFactoryLocale.bind(this)(preset, object, isLocal);
  };

  dayjsFactory.toCalendarSystem.setDefault = function (calendar) {
    defaultCalendarSystem = calendar;
  };

  dayjsFactory.updateLocale = function (locale, customConfig) {
    const localeList = dayjsFactory.Ls;
    const localeConfig = localeList[locale];
    if (!localeConfig) return;
    const customConfigKeys = customConfig ? Object.keys(customConfig) : [];
    customConfigKeys.forEach((c) => {
      localeConfig[c] = customConfig[c];
    });
    return localeConfig; // eslint-disable-line consistent-return
  };

  // Convert a date from a specific calendar system to a Day.js instance
  dayjsFactory.fromCalendarSystem = (
    name,
    year,
    month,
    day,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0
  ) => {
    if (!calendarSystems[name]) {
      throw new Error(`Calendar system '${name}' is not registered.`);
    }
    const convertedDate = calendarSystems[name].convertToGregorian(
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    );
    return dayjsFactory(
      convertedDate.year + "-" + convertedDate.month + "-" + convertedDate.day
    );
  };

  // Register the Gregorian calendar system by default
  dayjsFactory.registerCalendarSystem("gregory", new GregoryCalendarSystem());
};
