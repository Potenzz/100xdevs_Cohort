// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```


const fs = require('fs');


const filePath = 'Assigments\\W2\\01-async-js\\medium\\file.txt';

function cleanFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        const cleanedData = data.replace(/\s+/g, ' ').trim();

        fs.writeFile(filePath, cleanedData, (err) => {
            if (err) {
                console.error("Error writing to the file:", err);
                return;
            }
            console.log("File has been cleaned and updated successfully!");
        });
    });
}

// Execute the file cleaning
cleanFileContent(filePath);
