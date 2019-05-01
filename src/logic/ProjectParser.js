import { Project } from "./Project";
import { Effort } from "./Effort";
export class ProjectParser {
    static fromString(string) {
        const isImportant = string.startsWith("*");
        if(isImportant) {
            string = string.slice(1);
        }
        if (string.indexOf(" - ") === -1) {
            return new Project(string);
        }
        const arrString = string.split(" - ");
        const effort = arrString.pop();
        return new Project(arrString.join(" - "), ProjectParser.parseEffort(effort), 0, isImportant);
    }
    static parseEffort(string) {
        switch (string) {
            case "XS" : return Effort.XSMALL;
            case "S"  : return Effort.SMALL;
            case "M"  : return Effort.MEDIUM;
            case "L"  : return Effort.LARGE;
            case "XL" : return Effort.XLARGE;
            case "XXL": return Effort.XXLARGE;
            default:
                const isNumber = Number.parseInt(string);
                if(Number.parseInt(string)) {
                    return new Effort("MD", isNumber);
                }
                return Effort.MEDIUM;
        }
    }
}
