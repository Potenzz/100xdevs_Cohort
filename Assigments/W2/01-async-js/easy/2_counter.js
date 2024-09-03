// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. 


let count = 0;

function updateCounter(){

    console.log(count);
    count++;

    setTimeout(updateCounter, 1000);
}

updateCounter()





































































