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

const updateQuantity = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { cart_item_id, quantity } = req.body;
        const result = await cartService.updateQuantity({ user_id, cart_item_id, quantity });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

const updateSize = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { cart_item_id, size } = req.body;
        const result = await cartService.updateSize({ user_id, cart_item_id, size });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

const removeItem = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;
        const result = await cartService.removeItem({ user_id, cart_item_id: id });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

const clearCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const result = await cartService.clearCart(user_id);

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = { getCartItems, addCartItem, updateQuantity, updateSize, removeItem, clearCart };