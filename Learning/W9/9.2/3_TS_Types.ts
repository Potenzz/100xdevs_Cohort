
// ------------------- Types --------------------

import { ErrorMapCtx, number } from "zod";

type User2 = {
    first_name : string, 
    age : number,
}

// Interfaces - 

interface User {
    first_name : string, 
    age : number,
}


// we can use 'Type' as interfaces, but one shortcomming of using Type is we can't implement them in classes.
// But on the other hand Type offers few extra thing as well like :

// 1. ---------------- Union

// without type way:
function greet4(id: (string | number)){
}
// with type:
type greetArg = string | number;
function greet5(id: greetArg){
}
// This basic code lets take two type of input, either number or string, which can be written by both ways. with or without type


// 2. ---------------- Intersection

type Employee = {
    name : string;
    startDate : Date;
};

interface Manager  {
    name : string;
    department : string;
}


// if the other ____ needs to have both the types, it can be done simply with below line

type TeamType = Employee & Manager;

const TeamLead: TeamType = {
    name : "vishnu",
    startDate: new Date(),
    department : "any",
}