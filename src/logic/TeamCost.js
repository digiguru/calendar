export class TeamCost {
    constructor(baseCost, developerCost) {
        this.baseCost = baseCost;
        this.developerCost = developerCost;
    }
    calculate(developerPerTeamCount, teamCount) {
        return (teamCount * (this.baseCost + (this.developerCost * developerPerTeamCount)));
    }
}
