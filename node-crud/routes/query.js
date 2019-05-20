const app = require('../index');
const config = require('../config');
const { MongoClient } = require('mongodb');

app.get('/query', (req, res) => {
    console.log('/query accessed.');

    MongoClient.connect(config.dbUrl, { useNewUrlParser: true })
        .catch(err => {
            console.log('数据库连接失败', err);
            res.json({
                code: -1,
                msg: '数据库连接失败'
            });
        })
        .then(client => {
            const promise = client.db(config.dbName).collection(config.collectionName).find({}).toArray();
            client.close();
            return promise;
        })
        .catch(err => {
            console.log('信息列表查询失败', err);
            res.json({
                code: -2,
                msg: '信息列表查询失败'
            });
        })
        .then(arr => {
            console.log('信息列表查询成功');
            res.json({
                code: 0,
                msg: '信息列表查询成功',
                data: arr.map(v => {
                    const { _id, name, age, gender, height, weight } = v;
                    return { _id, name, age, gender, height, weight };
                })
            });
        });
});