const app = require('../index');
const config = require('../config');
const { MongoClient, ObjectId } = require('mongodb');

app.delete('/delete', (req, res) => {
    console.log('/delete accessed.');


    MongoClient.connect(config.dbUrl, { useNewUrlParser: true })
        .catch(err => {
            console.log('数据库连接失败', err);
            res.json({
                code: -1,
                msg: '数据库连接失败'
            });
        })
        .then(client => {
            const _id = req.query._id;

            if (!_id) {
                res.json({
                    code: -3,
                    msg: '缺少参数'
                });

                return;
            }

            const promise = client.db(config.dbName).collection(config.collectionName).deleteOne({ _id: ObjectId(_id) });
            client.close();

            return promise;
        })
        .catch(err => {
            console.log('信息删除失败', err);
            res.json({
                code: -2,
                msg: '信息删除失败'
            });
        })
        .then(result => {
            console.log('信息删除成功');
            res.json({
                code: 0,
                msg: '信息删除成功'
            });
        });
});