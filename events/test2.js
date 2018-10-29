// 单次监听器

const http = require('http');
let server = http.createServer();

server.once('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('just a test.');
    console.log('has request.');
    res.end();
})

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');
