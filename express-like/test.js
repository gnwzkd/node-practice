const axpress = require('./index.js')

const app = axpress();

app.get('/fafa', (req, res) => {
    console.log(`get /fafa requested.`);
    res.end('fafa');
})

app.get('/dada', (req, res) => {
    console.log(`get /dada requested.`);
    res.end('dada');
})

app.listen(3000);