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

module.exports = {
    createOrder
};
