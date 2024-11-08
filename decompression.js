var fs = require("fs");  
var zlib = require('zlib');  

fs.createReadStream('demo.txt.gz')  
  .pipe(zlib.createGunzip())  
  .pipe(fs.createWriteStream('demo.txt'));  
  console.log("File Decompressed.");  