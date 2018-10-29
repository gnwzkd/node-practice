// 查看监听个数

const http = require('http');
const events =require('events');
let server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('test1');
    console.log('test1');
    res.end();
});

server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('test2');
    console.log('test2');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

console.log(events.EventEmitter.listenerCount(server, 'request'));
