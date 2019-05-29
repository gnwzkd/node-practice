const app = require('../index');
const db = new (require('../utils/db'))();
const { ObjectId } = require('mongodb');

app.put('/update', (req, res) => {
    console.log('/update accessed.');

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

    db.update('infoList', { _id: ObjectId(params._id) }, updateData)
        .then(result => {
            console.log('信息更新成功');
            res.json({
                code: 0,
                msg: '信息更新成功'
            });
        })
        .catch(err => {
            console.log('信息更新失败', err);
            res.json({
                code: -2,
                msg: '信息更新失败'
            });
        });

});