const http = require('http');
const cheerio = require('cheerio');
const https = require('https');
const url = require('url');

const pageStr = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OneLinkr</title>
</head>
<body>
    <p>test.</p>
</body>
</html>`;


http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true);
    switch (urlObj.path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(pageStr);
            break;
        default:
            let rresid = /[0-9A-F]{16}\!\d{3,4}/g;
            let resid = urlObj.query.resid;
            res.writeHead(200, { 'Content-Type': 'text/json' });
            if (resid && rresid.test(resid)) {
                https.get(`https://storage.live.com/items/${resid}`, (req) => {
                    let xml = '';
                    req.on('data', (data) => {
                        xml += data;
                    });
                    req.on('end', () => {
                        // console.log(xml);
                        // res.end(xml);
                        // 数据格式
                        // [
                        //     {
                        //         itemType: 'Folder',
                        //         resourceID: '5833DC4DF1D8DD1D!398',
                        //         relationshipName: "Aria2完全配置笔记（Windows）"
                        //     },
                        //     {
                        //         itemType: 'Document',
                        //         resourceID: '5833DC4DF1D8DD1D!392',
                        //         relationshipName: "文档1.docx"
                        //     }
                        // ]
                        let data = [];
                        let $ = cheerio.load(xml);
                    });
                }).on('error', (e) => {
                    console.log(e.message);
                });;
            } else {
                res.end('{}');
            }
            break;
    }
}).listen(3000, '0.0.0.0', () => {
    console.log('Listen in http://0.0.0.0:3000/');
});

function getData(urlObj) {

};
