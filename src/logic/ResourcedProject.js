export class ResourcedProject {
    constructor(name, resource = [], efficency = 1) {
        this.name = name;
        this.resource = resource;
        this.efficency = efficency;
    }
    DailyCapacity() {
        const reduced = this.resource.reduce((prev, curr) => {
            return prev + (curr.capacity || 0);
        }, 0);
        return reduced * this.efficency;
    }
    WorkableDays(startDate, endDate) {
        const resourceList = this.resource.map(resource => {
            return resource.holidaySet.WorkingDaysList(startDate, endDate).map(date => {
                return {date: date, name: resource.name, capacity: resource.capacity};
            }); 
        });
        const flat = [].concat(...resourceList).sort((a,b) => a.date.getTime() - b.date.getTime());
        return flat;
    }
    WorkingDaysFrom(startDate, workingDays) {
        const resourceList = this.resource.map(resource => {
            return resource.holidaySet.WorkingDaysFrom(startDate, workingDays).map(date => {
                return {date: date, name: resource.name, capacity: resource.capacity};
            }); 
        });
        const flat = [].concat(...resourceList).sort((a,b) => a.date.getTime() - b.date.getTime());
        return flat;
    }
}
