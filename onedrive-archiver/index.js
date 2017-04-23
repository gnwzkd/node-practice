const http = require('http');
const cheerio = require('cheerio');
const https = require('https');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true);
    let rresid = /[0-9A-F]{16}\!\d{3,4}/g;
    let resid = urlObj.query.resid;
    if (resid && rresid.test(resid)) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
        https.get(`https://storage.live.com/items/${resid}`, (req) => {
            let xml = '';
            req.on('data', (data) => {
                xml += data;
            });
            req.on('end', () => {
                // console.log(xml);
                // res.end(xml);
                // 数据格式
                // {
                //     parentResourceId: '5833DC4DF1D8DD1D!105',
                //     items: [{
                //         itemType: 'Folder',
                //         resourceID: '5833DC4DF1D8DD1D!398',
                //         relationshipName: "Aria2完全配置笔记（Windows）"
                //     }, {
                //         itemType: 'Document',
                //         resourceID: '5833DC4DF1D8DD1D!392',
                //         relationshipName: "文档1.docx"
                //     }]
                // }
                let $ = cheerio.load(xml);
                let data = {
                    parentResourceId: $('ParentResourceID').html(),
                    items: []
                };
                $('Items > *').each((i, v) => {
                    data.items.push({
                        itemType: $(v).find('ItemType').html(),
                        resourceID: $(v).find('ResourceID').html(),
                        relationshipName: unescape($(v).find('RelationshipName').html().replace(/&#x/g, '%u').replace(/;/g, '').replace(/%uA0/g, ' '))
                    });
                });
                res.end(JSON.stringify(data));
            });
        }).on('error', (e) => {
            console.log(e.message);
        });
    } else {
        fs.readFile(urlObj.pathname === '/' ? 'index.html' : urlObj.pathname, (err, data) => {
            res.end(data);
        });
    }
}).listen(3000, '0.0.0.0', () => {
    console.log('Listen in http://0.0.0.0:3000/');
});

function getData(urlObj) {

};
