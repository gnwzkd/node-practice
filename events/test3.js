// 移除监听器

const http = require('http');
let server = http.createServer();

function  cb(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('just a test.');
    console.log('has request.');
    res.end();
}

server.on('request', cb);

server.removeListener('request', cb);

server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('just a alter.');
    console.log('has alter request.');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
