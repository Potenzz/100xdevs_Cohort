// Variables, Datatypes, IF-else, Loop.


// Variable
// -------------------------------------------------


// let, var, const

// let - can't be redefined in a function, only limited to the block ie. loop, if-else.
// var - can be redefined inside func as well, global scope. 
// const - can be defined only once.


// let a=1;
// a=2;
// console.log(a);

// var b=1;
// b=2;
// console.log(b);

// const c=1;
// // c=2; // it will give error, 
// console.log(c);




// Datatypes 
// ---------------------------------------------------------


let firstname = "Vishnu";
let age = 21;
let happy = false;

console.log("The user name is "+firstname+" and his age is "+age);



// IF-ELSE
if (happy==true){
    console.log("HE is happy");
}
else{
    console.log("HE is not Happy");
}

// loop

let answer=1;
for (let i=1; i<100; i++){
    answer=answer+i;
}
1
console.log(answer)