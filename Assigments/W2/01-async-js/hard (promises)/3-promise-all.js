/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */


// Function to return a promise that resolves after t seconds

function wait(t){
    return new Promise((resolve) => {
        setTimeout(() => resolve(), t*1000);
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

// Function to calculate the total time taken for all three waits
function calculateTime(t1, t2, t3) {
    const start = Date.now(); // Record the start time
    
    // Wait for all three promises to resolve
    return Promise.all([wait1(t1), wait2(t2), wait3(t3)])
        .then(() => {
            const end = Date.now(); // Record the end time
            return end - start; 
        });
}

module.exports = calculateTime;
