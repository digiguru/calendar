import { Project } from "./Project";
import { Effort } from "./Effort";
export class ProjectParser {
    static fromString(string) {
        const isImportant = string.startsWith("*");
        if(isImportant) {
            string = string.slice(1);
        }

        let name = "";
        let effort = Effort.MEDIUM;
        ["-","\t"," "].some(splitter => {
            name = string.substring(0, string.lastIndexOf(splitter));
            let effortString = string.substring(string.lastIndexOf(splitter) + 1, string.length);
            effort = ProjectParser.parseEffort(effortString);
            if (!effort) {
                return false;
            }
            return true;
        });
        
        if (!effort) {
            name = string;
            effort = Effort.MEDIUM;
        }
/*
        if (!string.indexOf(" - ") > 0) {
            arrString = string.split(" - ");
            splitter = " - ";
        } else if (string.indexOf("\t") > 0) {
            arrString = string.split("\t")
            splitter = "\t";
        } else {
            arrString = string.split(" ")
            splitter = " ";
        }
        const effortString = arrString.pop();
       */
        
        return new Project(name.trim(), effort, 0, isImportant);
    }
    static parseEffort(string) {
        switch (string.trim()) {
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
                return null;
        }
    }
}
