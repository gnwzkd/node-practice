const path = require('path');
const app = require('../index');
const config = require('../config');
const fs = require('fs');


fs.readdir(path.join(config.basePath, 'routes'), (err, res) => {
    if (err) {
        console.log('routes/index.js: read directory error.')
        return;
    }

    // app.all(res.map(v => `/${v.split('.').shift()}`), (req, res, next) => {
    //     res.header('Content-Type', 'application/json; charset=utf-8');
    //     next();
    // });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    res.forEach(v => {
        if (/\.js$/.test(v) && v !== 'index.js') {
            require(`./${v}`);
        }
    });
});