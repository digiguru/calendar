import { Effort } from "./Effort";
export class Project {
    constructor(name, effort = Effort.MEDIUM, priority = 0, important = true) {
        this.name = name;
        this.priority = priority;
        this.effort = effort;
        this.important = important;
    }
}