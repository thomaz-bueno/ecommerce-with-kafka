const favoritesRepository = require('../repositories/favorites.repository.js');

const toggleFavorite = async ({ user_id, product_id }) => {
    const existing = await favoritesRepository.findByUserAndProduct({ user_id, product_id });

    if(existing) {
        await favoritesRepository.remove({ user_id, product_id });
        return { status: 'removed', message: 'Desfavoritado com sucesso' };
    }

    await favoritesRepository.add({ user_id, product_id });
    return { status: 'added', message: 'Favoritado com sucesso' };
};

const listFavorites = async (user_id) => {
    const favorites = await favoritesRepository.listByUser(user_id);
    return favorites;
}

module.exports = { toggleFavorite };