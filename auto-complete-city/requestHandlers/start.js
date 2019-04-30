function start(response) {
    console.log('Request handler "start" was called.');

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('welcome.');
    response.end();
}

module.exports = start;
