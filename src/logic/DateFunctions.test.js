import { DateFunctions } from './DateFunctions';
describe('DateFunctions', () => {
    it('Can make a range of dates', () => {
        const startDate = new Date(2019, 3, 19);
        const endDate = new Date(2019, 3, 21);
        const dates = DateFunctions.DaysBetween(startDate, endDate);
        expect(dates.length).toBe(3);
    });
    it('Can add dates', () => {
        const startDate = new Date(2019, 3, 19);
        const newDate = DateFunctions.AddDate(startDate, 3);
        expect(newDate.toString()).toBe(new Date(2019, 3, 22).toString());
    });
});
