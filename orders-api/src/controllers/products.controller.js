const productsService = require('../services/products.service.js');

const listProducts = async (req, res) => {
    try {
        const result = await productsService.listProducts();

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message })
    }
}

const listOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { color } = req.query;
        console.log(color);
        const result = await productsService.listOneProduct({ id, color });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

module.exports = { listProducts, listOneProduct };