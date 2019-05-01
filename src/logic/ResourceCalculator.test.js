
    import {ResourceCalculator} from './ResourceCalculator';
    import {Resource} from './Users';
    import {ResourcedProject} from './ResourcedProject';
    import {DateFunctions} from './DateFunctions';
    import { Holiday } from "./Holiday";
    import { HolidaySet } from "./HolidaySet";

describe('The Resource Calculator', () => {
    
   
    it('Can determine length of time based on capcity', () => {
        const mondayBeforeBankHoliday = new Date(2019, 3, 15);
        
        const project = new ResourcedProject('Navigator', [
            new Resource('Adam Hall',1),
        ], 1); //Full capacity

        
        
        const calc = new ResourceCalculator(project);
        const manDaysEstimate = 2; //2 days input, but 1 people working at 100% capacity, it should take 2 day.
        const workPackage = calc.AllocateWork(manDaysEstimate, mondayBeforeBankHoliday);
        const expected = DateFunctions.AddDate(mondayBeforeBankHoliday, 1)

        expect(workPackage.endDate.toString()).toBe(expected.toString());
        
    });
    it('Can determine length of time based on capcity multiple users', () => {
        const mondayBeforeBankHoliday = new Date(2019, 3, 15);
        
        const project = new ResourcedProject('Navigator', [
            new Resource('Adam Hall',1),
            new Resource('Onisim Gabrian',1)
        ], 1); //Full capacity

        
        
        const calc = new ResourceCalculator(project);
        const manDaysEstimate = 4; //4 days input, but 2 people working at 100% capacity, it should take 2 day.
        const workPackage = calc.AllocateWork(manDaysEstimate, mondayBeforeBankHoliday);

        expect(workPackage.startDate.toString()).toBe(mondayBeforeBankHoliday.toString());
        expect(workPackage.endDate.toString()).toBe(DateFunctions.AddDate(mondayBeforeBankHoliday, 1).toString());
        
    });
    it('Can determine length of time based on half capacity', () => {
        const mondayBeforeBankHoliday = new Date(2019, 3, 15);
        
        const project = new ResourcedProject('Navigator', [
            new Resource('Adam Hall',1),
        ], 0.5); //Half capacity

        
        
        const calc = new ResourceCalculator(project);
        const manDaysEstimate = 2; //2 days input, but 1 peerson working at 50% capacity, it should take 4 day.
        const workPackage = calc.AllocateWork(manDaysEstimate, mondayBeforeBankHoliday);

        expect(workPackage.startDate.toString()).toBe(mondayBeforeBankHoliday.toString());
        expect(workPackage.endDate.toString()).toBe(DateFunctions.AddDate(mondayBeforeBankHoliday,3).toString());
        
    });
    it('Can determine length of time based on half capacity, multiple users', () => {
        const mondayBeforeBankHoliday = new Date(2019, 3, 15);
        
        const project = new ResourcedProject('Navigator', [
            new Resource('Adam Hall',1),
            new Resource('Onisim Gabrian',1)
        ], 0.5); //Half capacity

        
        
        const calc = new ResourceCalculator(project);
        const manDaysEstimate = 4; //4 days input, but 2 people working at 50% capacity, it should take 2 day.
        const workPackage = calc.AllocateWork(manDaysEstimate, mondayBeforeBankHoliday);

        expect(workPackage.startDate.toString()).toBe(mondayBeforeBankHoliday.toString());
        expect(workPackage.endDate.toString()).toBe(DateFunctions.AddDate(mondayBeforeBankHoliday, 3).toString());
        
    });

    it('Doesnt Allocate Work during a holiday or weekend', () => {
        const dayBefore = new Date(2019, 3, 18);
        const goodFriday = new Date(2019, 3, 19);
        
        const holiday = new HolidaySet('UK',[
            new Holiday('Good Friday', goodFriday)
        ]);

        const project = new ResourcedProject('Navigator', [
            new Resource('Adam Hall',1,holiday),
        ], 1); //Half capacity

        
        
        const calc = new ResourceCalculator(project);
        const manDaysEstimate = 2; //2 days input, but 1 person working at 100% capacity, it should take 2 days, plus Bank holiday friday, saturday and sunday.
        const workPackage = calc.AllocateWork(manDaysEstimate, dayBefore);

        expect(workPackage.startDate.toString()).toBe(dayBefore.toString());
        expect(workPackage.endDate.toString()).toBe(DateFunctions.AddDate(dayBefore, 4).toString());
        
    });

    it('Doesnt Allocate Work during a holiday or weekend, multiple users', () => {
        const dayBefore = new Date(2019, 3, 18);
        const goodFriday = new Date(2019, 3, 19);
        
        const holiday = new HolidaySet('UK',[
            new Holiday('Good Friday', goodFriday)
        ]);

        const project = new ResourcedProject('Navigator', [
            new Resource('Adam Hall',1,holiday),
            new Resource('Onisim Gabrian',1),
        ], 1); 

        
        
        const calc = new ResourceCalculator(project);
        const manDaysEstimate = 4; //5 days input, but 1 person working at 50% capacity, it should take 10 days, plus Bank holiday friday, saturday and sunday.
        const workPackage = calc.AllocateWork(manDaysEstimate, dayBefore);

        expect(workPackage.startDate.toString()).toBe(dayBefore.toString());
        expect(workPackage.endDate.toString()).toBe(DateFunctions.AddDate(dayBefore, 4).toString());
        
    });

});

