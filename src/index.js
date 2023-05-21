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
  const Utils = dayjsClass.prototype.$utils();

  const wrapper = function(date, instance) {
    // Get all the properties and their values from the instance:
    const properties = Object.keys(instance).reduce((props, key) => {
      if (key === "$L") {
        props["locale"] = instance[key];
      } else if (key === "$u") {
        props["utc"] = instance[key];
      } else if (instance[key] !== instance) {
        props[key] = instance[key];
      }
      return props;
    }, {});
    // Create a new instance of the class with the given date:
    const newInstance = dayjsFactory(date, properties);
    // Add the $x property (used for timezone) to the new instance:
    if ("$x" in instance) {
      newInstance.$x = instance.$x;
    }
    if ("$C" in instance && instance.$C !== "gregory") {
      // If the calendar system is set, convert the date to the specified calendar system
      return newInstance.toCalendarSystem(instance.$C);
    }
    return newInstance;
  };

  // Register a new calendar system
  dayjsFactory.registerCalendarSystem = (name, calendarSystem) => {
    if (calendarSystem.constructor.typeName !== 'CalendarSystemBase') {
      throw new Error('Calendar system must extend CalendarSystemBase');
    }

    calendarSystems[name] = calendarSystem;

      if (typeof calendarSystem.daysInMonth === 'function') {
        const originalDaysInMonth = dayjsClass.prototype.daysInMonth;
        dayjsClass.prototype.daysInMonth = function() {
          if (this.$C && this.$C !== 'gregory') {
            return calendarSystem.daysInMonth(this.$y, this.$M);
          } else {
            return originalDaysInMonth.call(this);
          }
        };
      }

      if (typeof calendarSystem.startOf === 'function') {
        const originalStartOf = dayjsClass.prototype.startOf;
        dayjsClass.prototype.startOf = function(units) {
          if (this.$C && this.$C !== 'gregory') {
            return calendarSystem.startOf(this.$y, this.$M, this.$D, units);
          } else {
            return originalStartOf.call(this, units);
          }
        };
      }

      if (typeof calendarSystem.endOf === 'function') {
        const originalEndOf = dayjsClass.prototype.endOf;
        dayjsClass.prototype.endOf = function(units) {
          if (this.$C && this.$C !== 'gregory') {
            return calendarSystem.endOf(this.$y, this.$M, this.$D, units);
          } else {
            return originalEndOf.call(this, units);
          }
        };
      }
  };

  // Get a calendar system from the registry:
  dayjsFactory.getRegisteredCalendarSystem = name => {
    if (!calendarSystems[name]) {
      throw new Error(`Calendar system '${name}' is not registered.`);
    }
    return calendarSystems[name];
  };

  const oldInit = dayjsClass.prototype.init;
  dayjsClass.prototype.init = function(options) {
    oldInit.bind(this)(options);
    if (this.$C && this.$C !== "gregory") {
      this.toCalendarSystem(this.$C);
    }
  };
  // Override the default clone method to also clone the calendar system
  dayjsClass.prototype.clone = function() {
    return wrapper(this.$d, this);
  };

  // Override the default startOf method to convert the date to the specified calendar system
  dayjsClass.prototype.startOf = function(units, startOf) {
    // startOf -> endOf
    const isStartOf = !Utils.u(startOf) ? startOf : true;
    const unit = Utils.p(units);
    const instanceFactory = (d, m, y = this.$y) => {
      // if calendar system is not gregorian, convert the date to gregorian
      if ("$C" in this && this.$C !== "gregory") {
        const convertedDate = calendarSystems[this.$C].convertToGregorian(
          y,
          m,
          d
        );
        y = convertedDate.year;
        m = convertedDate.month;
        d = convertedDate.day;
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
      return wrapper(
        this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          this.toDate("s"),
          (isStartOf ? argumentStart : argumentEnd).slice(slice)
        ),
        this
      );
    };
    const { $W, $M, $D } = this;
    const utcPad = `set${this.$u ? "UTC" : ""}`;
    switch (unit) {
      case "year":
        return isStartOf
          ? instanceFactory(1, 0)
          : instanceFactory(0, 0, this.$y + 1);
      case "month":
        return isStartOf
          ? instanceFactory(1, this.$M)
          : instanceFactory(
              0,
              (this.$M + 1) % 12,
              this.$y + parseInt((this.$M + 1) / 12, 10)
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
  dayjsClass.prototype.$set = function(units, int) {
    if (("$C" in this && this.$C === "gregory") || !("$C" in this)) {
      return old$Set.bind(this)(units, int);
    }
    const instanceFactory = (d, m, y = this.$y) => {
      const convertedDate = calendarSystems[this.$C].convertToGregorian(
        y,
        m,
        d
      );
      this.$d.setFullYear(convertedDate.year);
      this.$d.setMonth(convertedDate.month);
      this.$d.setDate(convertedDate.day);
      return this;
    };
    switch (units) {
      case "date":
      case "day":
        instanceFactory(int, this.$M);
        break;
      case "month":
        instanceFactory(this.$D, int);
        break;
      case "year":
        instanceFactory(this.$D, this.$M, int);
        break;
      default:
        return old$Set.bind(this)(units, int);
    }
    this.init();
    if ("$C" in this && this.$C !== "gregory") {
      return this.toCalendarSystem(this.$C);
    }
    return this;
  };

  const oldAdd = dayjsClass.prototype.add;
  dayjsClass.prototype.add = function(number, units) {
    number = Number(number); // eslint-disable-line no-param-reassign
    const unit = Utils.p(units);

    if (("$C" in this && this.$C === "gregory") || !("$C" in this)) {
      return oldAdd.bind(this)(number, units);
    }
    const instanceFactorySet = n => {
      const convertedDate = calendarSystems[this.$C].convertToGregorian(
        this.$y,
        this.$M,
        this.$D
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
    if (unit === "month") {
      return this.set("month", this.$M + number);
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
        ["second"]: 1e3
      }[unit] || 1; // ms

    const nextTimeStamp = this.$d.getTime() + number * step;
    return wrapper(nextTimeStamp, this);
  };

  const oldDate = dayjsClass.prototype.date;
  dayjsClass.prototype.date = function(input) {
    if ("$C" in this && this.$C !== "gregory") {
      return this.$g(input, "$D", "day");
    } else {
      return oldDate.bind(this)(input);
    }
  };

  dayjsFactory.toCalendarSystem = function(calendar) {
    if (!calendarSystems[calendar]) {
      throw new Error(`Calendar system '${calendar}' is not registered.`);
    }
    dayjsFactory.$C = calendar;
    return dayjsFactory;
  };

  // Convert a Day.js instance to a specific calendar system
  dayjsClass.prototype.toCalendarSystem = function(calendar) {
    if (!calendarSystems[calendar]) {
      throw new Error(`Calendar system '${calendar}' is not registered.`);
    }
    // Clone the current instance
    const newInstance = this.clone();
    // If the instance is not already in the required calendar system, initialize it
    // You would also convert the date to the specified calendar here.
    if (newInstance.$C !== calendar) {
      // Store the current calendar system in $C
      newInstance.$C = calendar;
      // if calendar is gregorian, convert to gregorian, otherwise convert to calendar
      if (calendar === "gregory") {
        const gregoryDate = newInstance.toDate();
        const convertedDate = calendarSystems[calendar].convertToGregorian(
          gregoryDate.getFullYear(),
          gregoryDate.getMonth(),
          gregoryDate.getDate()
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
    }
    // Update the locale to reflect the new calendar system
    dayjsFactory.locale(
      newInstance.$L,
      {
        ...newInstance.$locale(),
        ...calendarSystems[calendar].localeOverride(newInstance.$L)
      },
      true
    );
    return newInstance;
  };

  // Convert a date from a specific calendar system to a Day.js instance
  dayjsFactory.fromCalendarSystem = (name, year, month, day) => {
    if (!calendarSystems[name]) {
      throw new Error(`Calendar system '${name}' is not registered.`);
    }
    const convertedDate = calendarSystems[name].convertToGregorian(
      year,
      month,
      day
    );
    return dayjsFactory(
      convertedDate.year + "-" + convertedDate.month + "-" + convertedDate.day
    );
  };

  // Register the Gregorian calendar system by default
  dayjsFactory.registerCalendarSystem("gregory", new GregoryCalendarSystem());
};
