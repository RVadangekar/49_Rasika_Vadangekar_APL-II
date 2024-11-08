const fs = require('fs');

console.log("Open file!");
const buffer = Buffer.from('Hello Rasika Vadangekar');
fs.writeFile('bufferDemo.txt', buffer, (err) => {
    if (err) {
        return console.error('Error writing file:', err);
    }
    console.log("Buffer written to file successfully.");

    fs.readFile('bufferDemo.txt', (err, data) => {
        if (err) {
            return console.error('Error reading file:', err);
        }
        console.log("File content as Buffer:", data);
        console.log("File content as String:", data.toString());
    });
});
