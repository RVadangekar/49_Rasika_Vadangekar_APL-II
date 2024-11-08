var process = require('process'); 

console.log('this is the working directory --> ' + process.cwd()); 

console.log('this is the process version --> ' + process.version); 

console.log('current OS we are using --> ' + process.platform);

console.log('Feature Property: ', process.features);