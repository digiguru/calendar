
import { Effort } from "./Effort";
import { ProjectList } from "./ProjectList";
import { Project } from "./Project";

describe('The Project List', () => {

    it('Can have items in a list in the order they come in', () => {
        const input = new ProjectList();

        input.Add(new Project('High priority', null, 2));
        input.Add(new Project('Low priority', null, 1));
        
        const output = input.GetProjects();

        expect(output[0].name).toBe('High priority');
        expect(output[1].name).toBe('Low priority');

    });

    it('Items come out in prioirty order', () => {
        const input = new ProjectList();

        input.Add(new Project('Low priority', null, 1));
        input.Add(new Project('High priority', null, 2));

        const output = input.GetProjects();

        expect(output[0].name).toBe('High priority');
        expect(output[1].name).toBe('Low priority');

    });

    it('Items with matching prioirty come out First In First Out (FIFO)', () => {
        const input = new ProjectList();

        input.Add(new Project('First in'));
        input.Add(new Project('Last in'));

        const output = input.GetProjects();

        expect(output[0].name).toBe('First in');
        expect(output[1].name).toBe('Last in');

    });

    it('Items with matching prioirty come out First In First Out (FIFO)', () => {
        const input = new ProjectList();

        input.Add(new Project('Small', Effort.SMALL));
        input.Add(new Project('Medium', Effort.MEDIUM));

        const output = input.GetTotalEffort();
        expect(output).toEqual(Effort.SMALL.days + Effort.MEDIUM.days);

    });
    

});