// ------------------- see the Problem here, 

import { string } from "zod";

type Input = number | string;

function firstEle(arr: Input[]){
    return arr[0];
}

const value = firstEle(["Vishnu", "rahul"]);

// all good till here, as we can see clearly it only got string values, so we might convert them to uppercase, 
// console.log(value.toUpperCase());// but TS won't allow us to do this, it says number can't use toUpperCase() thing.


// ---------- 2nd problem, if i want that , the user wither give number or str, not mixed like this :
const value2 = firstEle(["Vishnu", 19])// i don't want mix, either num or str.. how it can be fixed?

// function firstEle(arr: string[] | number{}) // however, this thing can fix 2nd issue, but any other way?




// -------------------------------- Generic ----------------

function anyFunc <T>(arg: T):T{
    return arg;
}

let output1 = anyFunc<string>("Vishnu");
let output2 = anyFunc<number>(2);

console.log(output1.toUpperCase()) // this solved both the issues.

// we can also write it like this:
let output3 = anyFunc("Vishnu"); // it will automaticly get that it is a string.


// with arrays.
function anyFunc2 <T> (arr: T[]){
    return arr[0]
}

let output4 = anyFunc2(["Vishnu", 19]); // in this case, you might think that problem 2 is still there,
// then you expliditly need to give the type like<string> to avoild mixing values.




