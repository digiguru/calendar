import { DateFunctions } from "./DateFunctions";
export class HolidaySet {
    constructor(name, publicHolidays = []) {
        this.name = name;
        this.publicHolidays = publicHolidays;
    }
    isWorkDay(thisDate) {
        const day = thisDate.getDay();
        const isWeekend = (day === 6) || (day === 0);
        let isPublicHoliday = false;
        if (this.publicHolidays.length && this.publicHolidays.some(v => v.dayOfWeek.getTime() === thisDate.getTime())) {
            isPublicHoliday = true;
        }
        return !(isWeekend || isPublicHoliday);
    }
    WorkingDaysList(startDate, endDate) {
        const range = DateFunctions.DaysBetween(startDate, endDate); //Array.from({ length: ((endDate.getTime() - startDate.getTime()) / OneDay) + 1}, (_, i) => new Date(startDate.getTime() + (i * 86400000)));
        return range.filter(v => this.isWorkDay(v));
    }
    CountWorkingDays(startDate, endDate) {
        //const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
        const workingDays = this.WorkingDaysList(startDate, endDate);
        return workingDays.length;
    }
    AddHoliday(holidays) {
        this.publicHolidays = this.publicHolidays.concat(holidays);
    }
    WorkingDaysFrom(startDate, workingDays) {
        let dates = [startDate];
        let currentDate = startDate;
        let remainingDays = workingDays;
        while (remainingDays > 1) {
            currentDate = DateFunctions.AddDate(currentDate, 1);
            if (this.isWorkDay(currentDate)) {
                dates.push(currentDate);
                remainingDays--;
            }
        }
        return dates;
    }
}