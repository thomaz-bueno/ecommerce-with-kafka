const cartService = require('../services/cart.service.js');

const getCartItems = async (req, res) => {
    try {
        const result = await cartService.getCartItems(req.body);

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

const addCartItem = async (req, res) => {
    try {
        const result = await cartService.addCartItem(req.body);

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = { getCartItems, addCartItem };