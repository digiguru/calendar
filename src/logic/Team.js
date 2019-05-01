
export class Team {
    constructor(name, capabilities) {
        this.name = name;
        this.capabilities = [...new Set(capabilities)];
    }
}


