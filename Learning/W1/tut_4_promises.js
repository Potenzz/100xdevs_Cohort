// PROMISES : 

const fs = require('fs');

// ----------- Normal Approach to use async method. ----------------



//async func
function VishReadFile(cb){
    fs.readFile("Learning\\W1\\a.txt", "utf-8", function(err, data){
        cb(data);
    });
}

// callback func
function onDone(data){
    console.log(data)
}

// Calling main func which calls back onDone func.
VishReadFile(onDone)




// -------------- Using with Promises. -------------------------

// #1 - Main Snippet.
// async func
function VishReadFile(){
    return new Promise(function(resolve){
        fs.readFile("Learning\\W1\\a.txt", "utf-8", function(err, data){
            resolve(data);
        });
    })
}


// Callback func to call
function onDone(data){
    console.log(data)
}

VishReadFile().then(onDone);


// #2 - Understanding Different way to use Promises.

function VishReadFile(){
    console.log("inside Vish");
    var p = new Promise(function(resolve){
        console.log("Inside promise");
        
        fs.readFile("Learning\\W1\\a.txt", "utf-8", function(err, data){
            console.log("Before Resolve");
            resolve(data);
        });
    })
    return p;
}


// Callback func to call
function onDone(data){
    console.log(data)
}

var a = VishReadFile()
console.log(a);
a.then(onDone);



// Basics to use Promise. 

// #1
var d = new Promise(function(resolve) {
    setTimeout(function(){
        resolve("foo");
    }, 1000);
});

function callback(){
    console.log(d)
};

console.log(d)
d.then(callback)

// #2

function VishAsyncFunction(){
    let p = new Promise(function(resolve){
        resolve("Hi there");
    });
    return p;
}

const value = VishAsyncFunction();
value.then(function(data){
    console.log(data);
})



// Using Await. (it comes under the Promises.)

function VishAsyncFunction(){
    let p = new Promise(function(resolve){
        setTimeout(function(){
        resolve("Hi there using await.")}, 3000)
    });
    return p
}


async function main(){
    const value = await VishAsyncFunction();
    console.log("hello")// but inside function, it will be called only when it waits for the resolve value.
    console.log(value); 
    

    
}

main()
// see, this below "hi" comes first, unlike inside main() where "hello" came after it wait,
// here "hi" comes in second thread.i.e async.
console.log("hi ")