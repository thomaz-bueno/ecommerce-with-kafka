const favoritesService = require('../services/favorites.service.js');

const toggleFavorite = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { product_id } = req.body;
        const result = await favoritesService.toggleFavorite({ user_id, product_id });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}

const listFavorites = async (req, res) => {
    try {
        const user_id = req.user.id;
        const result = await favoritesService.listFavorites(user_id);

        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({ erro: err.message });
    }
}
module.exports = { listFavorites, toggleFavorite }