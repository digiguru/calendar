import { Resource } from './Users';
import { ResourcedProject } from "./ResourcedProject";
import { Holiday } from "./Holiday";
import { HolidaySet } from "./HolidaySet";

describe('The Resourced Projects', () => {
    it('Can be created with a name', () => {
        const input = new ResourcedProject('Navigator');
        expect(input.name).toBe('Navigator');
        expect(input.DailyCapacity()).toBe(0);
    });
    it('Can be created with a name and have resource', () => {
        const input = new ResourcedProject('Navigator', [
            new Resource('Adam Hall', 1)
        ]);
        expect(input.name).toBe('Navigator');
        expect(input.DailyCapacity()).toBe(1);
    });
    it('Can be created with a name and have multiple resource', () => {
        const input = new ResourcedProject('Navigator', [
            new Resource('Adam Hall', 1),
            new Resource('Onisim Gabrian', 0.5)
        ]);
        expect(input.name).toBe('Navigator');
        expect(input.DailyCapacity()).toBe(1.5);
    });
    it('Calculates efficency', () => {
        const input = new ResourcedProject('Navigator', [
            new Resource('Adam Hall', 1)
        ], 0.6);
        expect(input.name).toBe('Navigator');
        expect(input.DailyCapacity()).toBe(0.6);
    });
    it('Calculates efficency over multiple people', () => {
        const input = new ResourcedProject('Navigator', [
            new Resource('Adam Hall', 1),
            new Resource('Onisim Gabrian', 0.4)
        ], 0.5);
        expect(input.name).toBe('Navigator');
        expect(input.DailyCapacity()).toBe(0.7);
    });
    it('Gets WorkingDays for people', () => {
        const goodFriday = new Date(2019, 3, 19);
        const ukHoliday = new HolidaySet('UK',[
            new Holiday('Good Friday', goodFriday)
        ]);
        const input = new ResourcedProject('Navigator', [
            new Resource('Adam Hall', 1, ukHoliday),
            new Resource('Onisim Gabrian', 0.4)
        ], 0.5);
        const days = input.WorkableDays(new Date(2019, 3, 18), new Date(2019, 3, 22));
        
        expect(days.length).toBe(5); // Adam = Thursday, Monday. Onsisim = Thursday, Friday & Monday
        expect(days.filter(v => v.name === 'Onisim Gabrian').length).toBe(3);
        expect(days.filter(v => v.name === 'Adam Hall').length).toBe(2);
    });
});
