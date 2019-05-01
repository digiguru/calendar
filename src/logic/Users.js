import { HolidaySet } from "./HolidaySet";

export class Resource {
    constructor(name, capacity, holidaySet) {
        this.name = name;
        this.capacity = capacity;
        this.holidaySet = holidaySet || new HolidaySet();
    }
}


