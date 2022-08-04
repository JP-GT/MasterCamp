const fs = require('fs').promises;

try {
    await fs.appendFile('myFile.txt', textData);
} catch (error) {
    console.log(error);
}