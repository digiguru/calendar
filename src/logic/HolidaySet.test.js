import { DateFunctions } from './DateFunctions';
import { Holiday } from "./Holiday";
import { HolidaySet } from "./HolidaySet";


describe('The HolidaySet', () => {
    it('Can be initialized with a name', () => {
        const input = new HolidaySet('UK');
        expect(input.name).toBe('UK');
    });  

    it('Can determine Working Days', () => {
        const input = new HolidaySet('UK');
        const aRandomThursday = new Date(2019, 3, 19); 
        expect(input.isWorkDay(aRandomThursday)).toBe(true);
    });  

    it('Can determine Weekends', () => {
        const input = new HolidaySet('UK');
        const aRandomSaturday = new Date(2019, 3, 20); 
        expect(input.isWorkDay(aRandomSaturday)).toBe(false);
    });  


    it('Can determine public holidays given a list', () => {
        const goodFriday = new Date(2019, 3, 19);
        const input = new HolidaySet('UK',[
            new Holiday('Good Friday', goodFriday)
        ]);
        expect(input.isWorkDay(goodFriday)).toBe(false);
    });

    it('Can determine working days', () => {
        const beforeGoodFriday = new Date(2019, 3, 18);
        const goodFriday = new Date(2019, 3, 19);
        const input = new HolidaySet('UK',[
            new Holiday('Good Friday', goodFriday)
        ]);
        expect(input.isWorkDay(beforeGoodFriday)).toBe(true);
    });  

    it('Can determine non-working days', () => {
        const goodFriday = new Date(2019, 3, 19);
        const input = new HolidaySet('UK');
        input.AddHoliday([
            new Holiday('Good Friday', goodFriday)
        ]);
        expect(input.isWorkDay(goodFriday)).toBe(false);
    });


    it('Can get a list of all the days from a startDate and a total number of working days', () => {
        const input = new HolidaySet('UK');
        const friday = new Date(2019, 3, 5);
        const workingDays = input.WorkingDaysFrom(friday, 2);
        expect(workingDays.length).toBe(2);
        expect(workingDays[workingDays.length-1].toString()).toBe(DateFunctions.AddDate(friday, 3).toString());
    });

    it('Can calculate working days between 2 dates in a working week', () => {
        const input = new HolidaySet('UK');
        const countOfWorkingDays = input.CountWorkingDays(new Date(2019, 3, 8), new Date(2019, 3, 12));
        expect(countOfWorkingDays).toBe(5);

    });

    it('Can calculate working days between 2 dates in a full week', () => {
        const input = new HolidaySet('UK');
        const countOfWorkingDays = input.CountWorkingDays(new Date(2019, 3, 15), new Date(2019, 3, 19));
        expect(countOfWorkingDays).toBe(5);
        
    });

    it('Can calculate working days between 2 dates in a full week', () => {
        const input = new HolidaySet('UK');
        const countOfWorkingDays = input.CountWorkingDays(new Date(2019, 3, 15), new Date(2019, 3, 21));
        expect(countOfWorkingDays).toBe(5);
        
    });

    it('Can calculate working days between 2 dates in a full week with a public holiday', () => {
        const goodFriday = new Date(2019, 3, 19);
        const input = new HolidaySet('UK',[
            new Holiday('Good Friday', goodFriday)
        ]);
        const countOfWorkingDays = input.CountWorkingDays(new Date(2019, 3, 15), new Date(2019, 3, 21));
        expect(countOfWorkingDays).toBe(4);
        
    });
});



