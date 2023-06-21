/** This is a draft sandbox. DO NOT USE.

dayjsClass.prototype.tz = function (timezone = defaultTimezone, keepLocalTime) {
    const oldOffset = this.utcOffset()
    const date = this.toDate()
    const target = date.toLocaleString('en-US', { timeZone: timezone })
    const diff = Math.round((date - new Date(target)) / 1000 / 60)
    let ins = dayjsFactory(target).$set("millisecond", this.$ms)
      .utcOffset((-Math.round(date.getTimezoneOffset() / 15) * 15) - diff, true)
    if (keepLocalTime) {
      const newOffset = ins.utcOffset()
      ins = ins.add(oldOffset - newOffset, "minute")
    }
    ins.$x.$timezone = timezone
    return ins
  }

   // dayjsClass.prototype.OFF_utcOffset = function (input, keepLocalTime) {
  //   const { u } = this.$utils()
  //   if (u(input)) {
  //     if (this.$u) {
  //       return 0
  //     }
  //     if (!u(this.$offset)) {
  //       return this.$offset
  //     }
  //     return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  //   }

  //   if (typeof input === 'string') {
  //     input = offsetFromString(input)
  //     if (input === null) {
  //       return this
  //     }
  //   }
  //   const offset = Math.abs(input) <= 16 ? input * 60 : input
  //   let ins = this.clone();
  //   if (keepLocalTime) {
  //     ins.$offset = offset
  //     ins.$u = input === 0
  //     return ins
  //   }
  //   if (input !== 0) {
  //     const localTimezoneOffset = this.$u
  //        ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset()

  //     ins = this.local().add(offset + localTimezoneOffset, MIN)
  //     ins.$offset = offset
  //     ins.$x.$localOffset = localTimezoneOffset
  //   } else {
  //     ins = this.utc()
  //   }
  //   return ins
  // }

  // dayjsClass.prototype.OFF_utc = function (keepLocalTime) {
  //   let y = this.$y;
  //   let m = this.$M;
  //   let d = this.$D;
  //   // if calendar system is not gregorian, convert the date to gregorian
  //   if ("$C" in this && this.$C !== "gregory") {
  //     const convertedDate = calendarSystems[this.$C].convertToGregorian(
  //       this.$y,
  //       this.$M,
  //       this.$D,
  //       this.$H,
  //       this.$m,
  //       this.$s,
  //       this.$ms
  //     );
  //     y = convertedDate.year;
  //     m = convertedDate.month;
  //     d = convertedDate.day;
  //   }
  //   //const ins = wrapper(Date.UTC(y, m, d), { ...this, locale: this.$L, utc: true });
  //   const date = this.format("YYYY-MM-DDTHH:mm:ss.SSS");
  //   const ins = wrapper(date, { ...this, locale: this.$L, utc: true });

  //   if (keepLocalTime) {
  //     return ins.add(this.utcOffset(), "minute")
  //   }
  //   return ins
  // }
 */