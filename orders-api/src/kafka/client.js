const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'orders-api',
    brokers: ['localhost:9094'],
    retry: {
        initialRetryTime: 100,
        retries: 8,
    },
});

module.exports = kafka;