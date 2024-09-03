// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)




function formatTime24(hours, minutes, seconds) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function formatTime12(hours, minutes, seconds) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for AM
    return `${padZero(adjustedHours)}:${padZero(minutes)}:${padZero(seconds)} ${period}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const time24 = formatTime24(hours, minutes, seconds);
    const time12 = formatTime12(hours, minutes, seconds);

    console.clear(); // Clear the console for fresh output
    console.log(`24-hour format: ${time24}`);
    console.log(`12-hour format: ${time12}`);
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the time immediately
updateClock();
