const app = require('../index');
const config = require('../config');
const { MongoClient, ObjectId } = require('mongodb');

app.post('/create', (req, res) => {
    console.log('/create accessed.');

    MongoClient.connect(config.dbUrl, { useNewUrlParser: true })
        .catch(err => {
            console.log('数据库连接失败', err);
            res.json({
                code: -1,
                msg: '数据库连接失败'
            });
        })
        .then(client => {
            const params = req.body;
            const formRules = require('../utils/infoFormRules');

            let msgs = [];
            for (let key in formRules) {
                formRules[key].forEach(v => {
                    if (!v.validate(params[key])) {
                        msgs.push(v.message);
                    }
                });
            }

            if (msgs.length) {
                res.json({
                    code: -3,
                    msg: msgs.join(', ')
                });
                client.close();

                return;
            }

            const insertData = {};
            Object.keys(formRules).forEach(key => {
                insertData[key] = params[key];
            });
            
            const promise = client.db(config.dbName).collection(config.collectionName).insertOne(insertData);
            client.close();

            return promise;
        })
        .catch(err => {
            console.log('信息新增失败', err);
            res.json({
                code: -2,
                msg: '信息新增失败'
            });
        })
        .then(result => {
            console.log('信息新增成功');
            res.json({
                code: 0,
                msg: '信息新增成功'
            });
        });
});