const server = require('./server');
const router = require('./router');
const start = require('./requestHandlers/start');
const autoCompleteCity = require('./requestHandlers/autoCompleteCity');

const handle = {};
handle['/'] = start;
handle['/start'] = start;
handle['/autoCompleteCity'] = autoCompleteCity;

server.start(router.route, handle);