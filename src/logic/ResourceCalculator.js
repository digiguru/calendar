
import {WorkPackage} from './WorkPackage';

export class ResourceCalculator {
    constructor(project) {
        this.project = project;
    }
    AllocateWork (manDaysEstimate, startDate) {
        const totalDaysToPass = manDaysEstimate / this.project.DailyCapacity();
        const workDays = this.project.WorkingDaysFrom(startDate, totalDaysToPass);
        return new WorkPackage(workDays[0].date, workDays[workDays.length-1].date);
    }
}

