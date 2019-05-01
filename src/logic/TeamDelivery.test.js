import { TeamDelivery } from './TeamDelivery';
import { Project } from './Project';
import { Effort } from './Effort';

describe('Team Delivery', () => {
    
    
    

    it('Tasks go in smallest bucket', () => {
        
        const calc = new TeamDelivery();
        const tasks = [
            new Project("Small Item", Effort.SMALL)       
        ]
        const output = calc.calculate(1, 1, tasks);

        expect(output).toMatchObject({
            now: {tasks: [{ name: "Small Item"}]}
        });

    });

    it('Tasks fill in existing bucket', () => {
        
        const calc = new TeamDelivery();
        const tasks = [
            new Project("Small Item", Effort.SMALL),
            new Project("Another Small Item", Effort.SMALL)
        ]
        const output = calc.calculate(1,2,tasks);

        expect(output).toMatchObject({
            now: {tasks: [{ name: "Small Item"},
                          { name: "Another Small Item"}]}
        });
    });

    it('Tasks roll over to the next bucket', () => {
        
        const calc = new TeamDelivery();
        const tasks = [
            new Project("Small Item", Effort.SMALL),
            new Project("Too big to land now", Effort.SMALL)
        ]
        const output = calc.calculate(1,1,tasks);

        expect(output).toMatchObject({
            now: {tasks: [{ name: "Small Item"}]},
            next: {tasks: [{name: "Too big to land now"}]}
        });

    });

    it('Developer count is used', () => {
        
        const calc = new TeamDelivery();
        const tasks = [
            new Project("Small Item", Effort.SMALL),
            new Project("Another Small Item", Effort.SMALL)
        ]
        const output = calc.calculate(2,1,tasks);

        expect(output).toMatchObject({
            now: {tasks: [{ name: "Small Item"},
                          { name: "Another Small Item"}]}
        });
    });

    it('Efficiency count is used', () => {
        
        const calc = new TeamDelivery();
        const tasks = [
            new Project("Small Item", Effort.SMALL),
            new Project("Another Small Item", Effort.SMALL)
        ]
        const output = calc.calculate(1,1,tasks,70);

        expect(output).toMatchObject({
            next: {tasks: [{ name: "Small Item"},{name: "Another Small Item"}]}
        });
    });

});
