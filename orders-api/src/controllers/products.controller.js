const productsService = require('../services/products.service.js');

const listProducts = async (req, res) => {
    try {
        const user_id = req.user?.id || null;
        const result = await productsService.listProducts(user_id);

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message })
    }
}

const listOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { color } = req.query;
        const user_id = req.user?.id || null;
        const result = await productsService.listOneProduct({ id, color, user_id });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = { listProducts, listOneProduct };
