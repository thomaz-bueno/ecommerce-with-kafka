const ordersService = require('../services/orders.service')

const createOrder = async (req, res) => {
    try {
        const result = await ordersService.createOrder(req.body, req.user.id);
        const statusCode = result.status === 'failed' ? 400 : 201;

        return res.status(statusCode).json(result);
    } catch(err) {
        return res.status(500).json({erro: err.message});
    }
}

const listOrders = async (req, res) => {
    try {
        const userId = req.user.id
        const result = await ordersService.listOrders(userId);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = {
    createOrder,
    listOrders
};
