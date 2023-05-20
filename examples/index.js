import Dayjs from 'dayjs';
import calendarSystems from "@calidy/dayjs-calendarsystems";
import PersianCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/PersianCalendarSystem";

Dayjs.extend(calendarSystems);

// Register the calendar system
Dayjs.registerCalendarSystem('persian', new PersianCalendarSystem());

// Now you can use the calendar system
const date = Dayjs().toCalendarSystem('persian');