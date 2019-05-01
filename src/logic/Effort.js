export class Effort {
    constructor (name, days = 0) {
        this.name = name;
        this.days = days;
    }
}

Effort.XSMALL  = new Effort('X-SMALL', 1);   //Day
Effort.SMALL   = new Effort('SMALL',   5);   //Week
Effort.MEDIUM  = new Effort('MEDIUM',  10);  //Fortnight
Effort.LARGE   = new Effort('LARGE',   21);  //Month
Effort.XLARGE  = new Effort('X-LARGE', 65);  //Quater
Effort.XXLARGE = new Effort('XXLARGE', 161); //Year
