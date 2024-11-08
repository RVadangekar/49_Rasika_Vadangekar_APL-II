const buffer1 = Buffer.alloc(100);
const buffer2 = Buffer.from('GFG');
const buffer3 = Buffer.from([1, 2, 3, 4]);

buffer1.write("Happy Learning");

const a = buffer1.toString('utf-8');
console.log(a);

console.log(Buffer.isBuffer(buffer1));
console.log(buffer1.length);

const bufferSrc = Buffer.from('ABC');
const bufferDest = Buffer.alloc(3);
bufferSrc.copy(bufferDest);

const Data = bufferDest.toString('utf-8');
console.log(Data);

const bufferOld = Buffer.from('RasikaVadangekar');
const bufferNew = bufferOld.slice(0, 6);
console.log(bufferNew.toString());

const bufferOne = Buffer.from('Happy Learning ');
const bufferTwo = Buffer.from('With GFG');
const bufferThree = Buffer.concat([bufferOne, bufferTwo]);
console.log(bufferThree.toString());
