const { consumePayment } = require('../kafka/consumers/payment.consumer.js');
const { consumeStock } = require('../kafka/consumers/stock.consumer.js');
const { consumeNotification } = require('../kafka/consumers/notification.consumer.js');

Promise.all([
    consumePayment(),
    consumeStock(),
    consumeNotification(),
]).catch(console.error);