const http = require('http');
const url = require('url');

function axpress() {
    const routerMap = {};

    const app = http.createServer((req, res) => {
        const { path } = url.parse(req.url);

        if (!routerMap[path]) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404');
            console.log(404, path);

            return;
        }

        routerMap[path](req, res);
    })

    app.get = (path, callback) => {
        console.log(`get ${path} registed.`);
        routerMap[path] = callback;
    }

    app.post = (path, callback) => {
        console.log(`get ${path} registed.`);
        routerMap[path] = callback;
    }

    return app;
}

module.exports = axpress;