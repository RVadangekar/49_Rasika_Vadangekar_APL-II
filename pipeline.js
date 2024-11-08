var fs = require("fs");  

var readerStream = fs.createReadStream('demo.txt');  

var writerStream = fs.createWriteStream('output.txt');  

readerStream.pipe(writerStream);  
console.log("Program Ended");   