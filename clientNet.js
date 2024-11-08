const net = require('net');

const client = net.connect(8080, 'localhost', function () {
    console.log('Client connected');
    client.write('Rasika Vadangekar\r\n');
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

client.on('end', function () {
    console.log('Server disconnected');
});

client.on('error', function (err) {
    console.error('Connection error:', err.message);
});
