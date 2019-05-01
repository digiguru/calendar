const oneDay = 86400000;
export class DateFunctions {
    static DaysBetween (startDate, endDate) {
        return Array.from({ length: ((endDate.getTime() - startDate.getTime()) / oneDay) + 1}, (_, i) => new Date(startDate.getTime() + (i * oneDay)));
    }
    static AddDate (inputDate, daysToAdd) {
        var newDate = new Date(inputDate.valueOf());
        newDate.setDate(newDate.getDate() + daysToAdd);
        return newDate;
    }
}
