export class ProjectList {
    constructor() {
        this.projects = [];
    }
    GetProjects() {
        return this.projects;
    }
    GetTotalEffort() {
        return this.projects.reduce((total, project) => total + project.effort.days, 0);
    }
    Add(project) { //name, priority = 0, effort = Effort.MEDIUM) {
        var index = this.projects.findIndex(x => project.priority > x.priority);
        index = (index === -1 ? this.projects.length : index);
        this.projects.splice(index, 0, project);
    }

}
