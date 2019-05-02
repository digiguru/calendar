export class Capacity {
    constructor(days, developerPerTeamCount = 1, teamCount = 1, efficiency = 100) {
        this.days = days;
        this.teamCount = teamCount;
        this.developerPerTeamCount = developerPerTeamCount;
        this.efficiency = efficiency / 100;
        this.reaminingCapacity = this.overallCapacity();
        this.tasks = [];
    }
    overallCapacity() {
        return this.days * this.teamCount * this.developerPerTeamCount * this.efficiency;
    }
    willWorkOn(task) {
        if (this.reaminingCapacity >= task.effort.days) {
            this.reaminingCapacity = this.reaminingCapacity - task.effort.days;
            this.tasks.push(task);
            return true;
        }
        return false;
    }
}
