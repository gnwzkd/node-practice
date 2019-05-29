const app = require('../index');
const db = new (require('../utils/db'))();

app.get('/query', (req, res) => {
    console.log('/query accessed.');

    db.find('infoList')
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
        })
        .catch(err => {
            console.log('信息列表查询失败', err);
            res.json({
                code: -2,
                msg: '信息列表查询失败'
            });
        });

});