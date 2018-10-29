// 自定义事件

const Events = require('events');
let ee = new Events.EventEmitter();

global.setInterval(_ => {
    ee.emit('myevent', 'test custom evet');
}, 3000);

ee.on('myevent', arg => {
    console.log(arg);
});

