// Import the promise-based version of the fs library
const fs = require('fs').promises;

// Define some text to be written to a file
var textData = "New_text";

try {
    // Write text to the given file name
    // await tells JavaScript to wait for the asyncronous function (Promise) to resolve before continuing
    await fs.writeFile('myFile.txt', textData);
} catch (error) {
    // Output any errors for inspection
    console.log(error);
}