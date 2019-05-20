module.exports = {
    name: [{
        validate: val => /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(val) && (val.length <= 15),
        message: '请输入 15 字以内的中文姓名'
    }],
    gender: [{
        validate: val => !!val,
        message: '请选择性别'
    }],
    age: [{
        validate: val => /^\d{1,3}$/.test(val) && val <= 120,
        message: '请输入 120 以内的正整数'
    }],
    height: [{
        validate: val => /^\d{2,3}$/.test(val) && val <= 274 && val >= 56,
        message: '请输入人类可能达到的身高 (50 ~ 274)'
    }],
    weight: [{
        validate: val => /^\d{1,3}$/.test(val) && val <= 700 && val >= 5,
        message: '请输入人类可能达到的体重 (5 ~ 700)'
    }]
};
