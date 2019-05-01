import { Team } from "./Team";

describe('The Team', () => {
    it('Can be created with a name', () => {
        const input = new Team("Nav");
        
        expect(input.name).toBe("Nav");
    });
    it('Can can have capabilties', () => {
        const input = new Team("Nav", ["FE"]);
    
        expect(input.capabilities.length).toBe(1);
    });

    it('Can cannot have duplicate capabilities', () => {
        const input = new Team("Nav", ["FE", "FE"]);
    
        expect(input.capabilities.length).toBe(1);
    });

});