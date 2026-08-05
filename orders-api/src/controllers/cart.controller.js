const cartService = require('../services/cart.service.js');

const getCartItems = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await cartService.getCartItems(user_id);

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

const addCartItem = async (req, res) => {
    try {
        const user_id = req.user.id;
        const result = await cartService.addCartItem({ user_id, ...req.body });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = { getCartItems, addCartItem };