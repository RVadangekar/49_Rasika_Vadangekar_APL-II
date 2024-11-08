var fs = require("fs");  
var zlib = require('zlib');  

fs.createReadStream('demo.txt')  
  .pipe(zlib.createGzip())  
  .pipe(fs.createWriteStream('demo.txt.gz'));  
  console.log("File Compressed.");  