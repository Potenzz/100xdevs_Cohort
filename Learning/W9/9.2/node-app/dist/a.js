"use strict";
class Employee {
    constructor(n, a) {
        this.name = n;
        this.age = a;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
}
const e = new Employee("Vishnu", 10);
e.greet("Hello ");
