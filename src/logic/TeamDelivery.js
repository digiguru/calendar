import { Capacity } from "./Capacity";

export class TeamDelivery {
    
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

