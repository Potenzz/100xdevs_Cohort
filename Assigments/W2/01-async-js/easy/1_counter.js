//  Create a counter in JavaScript

//We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second


// 1

// let count = 0;

// function updateCounter(){
//     console.log(count);
//     count++;
// }

// setInterval(updateCounter, 1000);

//2

let count = 0;

let interval = setInterval(function(){
    console.log(count);
    count++;

    if(count==5){
        clearInterval(interval);
    }
}, 1000)



// // another way of writing the 2
let count2 = 0;

function updateCounterTillno(interval){
    console.log(count);
    count2++;

    if(count2==5){
        clearInterval(interval);
    };
};

let interval2 = setInterval(function(){updateCounterTillno(interval2)}, 1000);

