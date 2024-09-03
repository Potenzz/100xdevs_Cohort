/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */


// Function to return a promise that resolves after t seconds
function wait(t) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), t * 1000); 
    });
}

function wait1(t1) {
    return wait(t1);
}

function wait2(t2) {
    return wait(t2);
}

function wait3(t3) {
    return wait(t3);
}

// calculate the time taken for all three waits sequentially
function calculateTime(t1, t2, t3) {
    const start = Date.now(); // start time

    // Sequentially execute the wait functions
    return wait1(t1)
        .then(() => wait2(t2))
        .then(() => wait3(t3))
        .then(() => {
            const end = Date.now(); // end time
            return end - start; 
        });
}

module.exports = calculateTime;
