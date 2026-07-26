const kafka = require('../client.js');

const consumePayment = async () => {
    const consumer = kafka.consumer({ groupId: 'payment-service' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'orders.created', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const order = JSON.parse(message.value.toString());
            console.log(`[payment] Processando pagamento do pedido ${order.orderId}`);
            await new Promise((r) => setTimeout(r, 300));
            console.log(`[payment] Pagamento do pedido ${order.orderId} concluído`);
        },
    });
};

module.exports = { consumePayment };