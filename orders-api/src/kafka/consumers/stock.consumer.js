const kafka = require('../client.js');
const stockRepository = require('../../repositories/stock.repository.js');

const consumeStock = async () => {
    const consumer = kafka.consumer({ groupId: 'stock-service' });
    
    await consumer.connect();
    console.log(`[stock] Consumer conectado!`)
    
    await consumer.subscribe({ topic: 'orders.created', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const order = JSON.parse(message.value.toString());
            console.log(`[stock] Processando o pedido ${order.orderId}`);

            try {
                await stockRepository.deductStockForOrder(order.items);
                console.log(`[stock] Pedido ${order.orderId} processado com sucesso`);
            } catch (err) {
                console.error(`[stock] Erro ao processar o pedido ${order.orderId}: `, err.message);
                throw err;
            }
        },
    });
};

module.exports = { consumeStock }; 
