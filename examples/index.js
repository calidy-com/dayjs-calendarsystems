import Dayjs from 'dayjs';
import calendarSystems from '../src/index.js';
import PersianCalendar from '../src/calendarSystems/persian.js'

Dayjs.extend(calendarSystems);

// Register the calendar system
Dayjs.registerCalendarSystem('persian', new PersianCalendar());

// Now you can use the calendar system
const date = Dayjs().toCalendarSystem('persian');