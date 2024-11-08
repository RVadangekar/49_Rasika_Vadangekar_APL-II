const domain = require('domain');

const myDomain = domain.create();

myDomain.on('error', (err) => {
    console.error('Domain caught an error:', err.message);
});

myDomain.run(() => {
    setTimeout(() => {
        throw new Error('Something went wrong in the async operation!');
    }, 1000);

    console.log('This message will appear before the error.');
});

myDomain.run(() => {
    console.log('Running another function in the domain.');
});
