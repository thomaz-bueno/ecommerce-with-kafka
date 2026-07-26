const kafka = require('../client.js');

const consumeNotification = async () => {
    const consumer = kafka.consumer({ groupId: 'notification-service' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders.created', fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({ message }) => {
            const order = JSON.parse(message.value.toString());
            console.log(`[notification] Enviando email de confirmação para pedido ${order.orderId}`);
            await new Promise((r) => setTimeout(r, 100));
            console.log(`[notification] Email do pedido ${order.orderId} enviado`);
        },
    });
};

module.exports = { consumeNotification };