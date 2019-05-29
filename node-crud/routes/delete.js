const app = require('../index');
const { ObjectId } = require('mongodb');
const db = new (require('../utils/db'))();

app.delete('/delete', (req, res) => {
    console.log('/delete accessed.');

    const _id = req.query._id;

    if (!_id) {
        res.json({
            code: -3,
            msg: '缺少参数'
        });

        return;
    }

    db.delete('infoList', { _id: ObjectId(_id) })
        .then(result => {
            console.log('信息删除成功');
            res.json({
                code: 0,
                msg: '信息删除成功'
            });
        })
        .catch(err => {
            console.log('信息删除失败', err);
            res.json({
                code: -2,
                msg: '信息删除失败'
            });
        });

});