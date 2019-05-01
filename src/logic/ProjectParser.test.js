import { Effort } from "./Effort";
import { ProjectParser } from "./ProjectParser";

describe('Project Parser', () => {

    it('Can create projects from a string', () => {
        const output = ProjectParser.fromString("Input Name");

        expect(output).toMatchObject({name:"Input Name"});

    });

    it('Important things can be asterisked', () => {
        const output = ProjectParser.fromString("*Important");

        expect(output).toMatchObject({name:"Important", important: true});
    });

    it('Important things can be asterisked', () => {
        const output = ProjectParser.fromString("*Important");

        expect(output).toMatchObject({name:"Important", important: true});
    });


    it('Can have an effort at the end spearated by a hyphen (-)', () => {
        const output = ProjectParser.fromString("Input Name - XL");

        expect(output).toMatchObject({name:"Input Name", effort: Effort.XLARGE});

    });

    it('Can parse a numeric effort', () => {
        const output = ProjectParser.fromString("Numeric Name - 1");
        
        expect(output).toMatchObject({name:"Numeric Name", effort: { days: 1, name: "MD"}});
    });

    it('Can parse with multiple hyphens', () => {
        const output = ProjectParser.fromString("Hyphenated - Name - S");

        expect(output).toMatchObject({name:"Hyphenated - Name", effort: Effort.SMALL});

    });

    it('Can understand missng efforts (and default them to mediums)', () => {
        const output = ProjectParser.fromString("Missing effort - ");

        expect(output).toMatchObject({name:"Missing effort", effort: Effort.MEDIUM});

    });
});