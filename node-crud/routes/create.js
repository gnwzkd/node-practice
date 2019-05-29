const app = require('../index');
const db = new (require('../utils/db'))();

app.post('/create', (req, res) => {
    console.log('/create accessed.');

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

    db.insert('infoList', insertData)
        .then(result => {
            console.log('信息新增成功');
            res.json({
                code: 0,
                msg: '信息新增成功'
            });
        })
        .catch(err => {
            console.log('信息新增失败', err);
            res.json({
                code: -2,
                msg: '信息新增失败'
            });
        });
});