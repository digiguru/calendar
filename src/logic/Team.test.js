import { Team } from "./Team";

describe('The Team', () => {
    it('Can be created with a name like "Nav"', () => {
        const input = new Team("Nav");
        
        expect(input.name).toBe("Nav");
    });
    it('Can have capabilties like "FE"', () => {
        const input = new Team("Nav", ["FE"]);
    
        expect(input.capabilities.length).toBe(1);
    });

    it('Cannot have duplicate capabilities, it just returns 1 of them', () => {
        const input = new Team("Nav", ["FE", "FE"]);
    
        expect(input.capabilities.length).toBe(1);
    });

});