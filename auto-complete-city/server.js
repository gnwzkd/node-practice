const http = require('http');
const url = require('url');
const process = require('process');

function start(route, handle) {
    function onRequest(request, response) {
        const pathname = url.parse(request.url).pathname;
        console.log(`Request for ${pathname} received.`);
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(process.env.PORT || 8080);
    console.log('Server has started.');
}

exports.start = start;