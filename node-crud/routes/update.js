const app = require('../index');
const config = require('../config');
const { MongoClient, ObjectId } = require('mongodb');

app.put('/update', (req, res) => {
    console.log('/update accessed.');

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

            const updateData = {};
            Object.keys(formRules).forEach(key => {
                updateData[key] = params[key];
            });

            const promise = client.db(config.dbName).collection(config.collectionName).updateOne({ _id: ObjectId(params._id) }, { $set: updateData });
            client.close();
            
            return promise;
        })
        .catch(err => {
            console.log('信息更新失败', err);
            res.json({
                code: -2,
                msg: '信息更新失败'
            });
        })
        .then(result => {
            console.log('信息更新成功');
            res.json({
                code: 0,
                msg: '信息更新成功'
            });
        });
});