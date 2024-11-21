// Topics to be covered in this script are below ones : 

// Async vs Sync Functions, 
// Use of CallBacks
// JS Browser Architecture
// Promise
// Async Await



// Async vs Sync Functions : 

// Synchronous - one after the other, sequential, Only One thing at a time.
// Asynchronous - Multiple things are context switching with each other. 

// The workflow of JS allows both functions, 
// sync func are the normal function we use. 


// Async are the few one which JS allows such as setTimeout()
function sayHello() {
    console.log("Hello!");
}
setTimeout(sayHello, 2000); // Delay execution of sayHello function by 2000 milliseconds (2 seconds)
console.log("This will be printed firstly, then setout one. however this is written next to the setout, still because setout func is asynchronous.")

// This above code will wait as given time after it runs the given func,, meanwhile whatever it written below this code will be implied it and this setoout func will keep on runnintg in the second thread, and when the below code is completed then only this second thread will be merged to main one.

// other example of async func is fs.readfile and Fetch.





// PROMISES : in tut_4.js 


