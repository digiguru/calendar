import { TeamCost } from './TeamCost';
describe('Team Cost', () => {
    
    const baseCost = 10000; // 1 QA + 1 BA
    const developerCost = 5000; //1 DEV
    const calculator = new TeamCost(baseCost, developerCost);
    

    it('Simple Team Count', () => {
        
        const teamCount = 1;
        const developerPerTeamCount = 1; 

        const cost = calculator.calculate(developerPerTeamCount, teamCount);
        
        expect(cost).toBe(15000);

    });

    it('Two Devs Team Count', () => {
        
        const teamCount = 1;
        const developerPerTeamCount = 2; 

        const cost = calculator.calculate(developerPerTeamCount, teamCount);
        
        expect(cost).toBe(20000);

    });


    it('Two Devs Two Teams Count', () => {
        
        const teamCount = 2;
        const developerPerTeamCount = 2; 

        const cost = calculator.calculate(developerPerTeamCount, teamCount);
        
        expect(cost).toBe(40000);

    });

    it('Two Devs One Teams Count', () => {
        
        const teamCount = 2;
        const developerPerTeamCount = 1; 

        const cost = calculator.calculate(developerPerTeamCount, teamCount);
        
        expect(cost).toBe(30000);

    });

});
