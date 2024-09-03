// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks

const fs = require('fs');

content = "this is just for testing, 4_write_to_file.js has written this"

fs.writeFile("output.txt", content, (err)=> {
    if(err){
        console.error("An error occurred : ", err);
        return;
    }
    console.log("File write successfully.")
});


