const fs = require('fs');

console.log("Open file!");

fs.open('demo.txt', 'w+', function (err, fd) {
    if (err) {
        return console.error(err);
    }

    var data = "rasika";
    
    fs.write(fd, data, (err, written) => {
        if (err) {
            return console.error(err);
        }

        fs.close(fd, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("The file was written successfully");

            // Now, let's read the file
            fs.readFile('demo.txt', 'utf8', (err, content) => {
                if (err) {
                    return console.error(err);
                }
                console.log("File content:", content);
            });
        });
    });
});
