export class Capacity {
    constructor (days, developerPerTeamCount = 1, teamCount = 1, efficiency = 100) {
        this.days = days;
        this.teamCount = teamCount;
        this.developerPerTeamCount = developerPerTeamCount;
        this.efficiency = efficiency/100;
        this.reaminingCapacity = this.overallCapacity();
        this.tasks = [];
    }
    overallCapacity () {
        return this.days * this.teamCount * this.developerPerTeamCount * this.efficiency;
    }
    willWorkOn(task) {
        if(this.reaminingCapacity >= task.effort.days) {
            this.reaminingCapacity = this.reaminingCapacity - task.effort.days;
            this.tasks.push(task);
            return true;
        }
        return false;
    }
}
export class TeamDelivery {
    constructor() {
    }
    calculate(developerPerTeamCount, teamCount, tasks, efficiency) {

        //Now (1 week) = 5
        //Next (+1 month) = 23 
        //Soon (+1 quarter) = 65
        //Later (+1 year) = 261
        //Unlikely (everything else)
        const now     = new Capacity(5,           developerPerTeamCount, teamCount, efficiency),
            next      = new Capacity(23-5,        developerPerTeamCount, teamCount, efficiency),
            soon      = new Capacity(65-23-5,     developerPerTeamCount, teamCount, efficiency),
            later     = new Capacity(261-65-23-5, developerPerTeamCount, teamCount, efficiency),
            never     = new Capacity(99999,       developerPerTeamCount, teamCount, efficiency);
        tasks.forEach(task => {
            if(!now.willWorkOn(task)) {
                if(!next.willWorkOn(task)) {
                    if(!soon.willWorkOn(task)) {
                        if(!later.willWorkOn(task)) {
                            if(!never.willWorkOn(task)) {
                                console.log("Wow, that's alot of work");
                            }
                        }
                    }
                }
            } 
        });

        return {
            now,
            next,
            soon,
            later,
            never
        }
    }
}


export class Effort {
    constructor (name, days = 0) {
        this.name = name;
        this.days = days;
    }
}

Effort.SMALL  = new Effort('SMALL',   5);   //Week
Effort.MEDIUM = new Effort('MEDIUM',  10);  //Fortnight
Effort.LARGE  = new Effort('LARGE',   23);  //Month
Effort.XLARGE = new Effort('X-LARGE', 65);  //Quater
//                                    261   //Year
