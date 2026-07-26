const kafka = require('./client.js');

const producer = kafka.producer({ allowAutoTopicCreation: false });

const connectProducer = async () => {
    await producer.connect();
    console.log('Kafka producer conectado');
}

const produceOrderCreated = async (order) => {
    await producer.send({
        topic: 'orders.created',
        messages: [
            {
                key: order.id,
                value: JSON.stringify({
                    type: 'ORDER_CREATED',
                    orderId: order.id,
                    items: order.items,
                    total: order.total,
                    createdAt: order.created_at,
                }),
            }
        ],
    });
};

module.exports = { connectProducer, produceOrderCreated };