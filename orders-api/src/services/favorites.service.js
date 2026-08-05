const favoritesRepository = require('../repositories/favorites.repository.js');
const s3Service = require('./s3.service.js');

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

    const favoritesWithImages = await Promise.all(
        favorites.map(async (favorite) => {
            const imageKey = `imagens/${favorite.product_id}/white.png`;
            const image_url = await s3Service.getSignedUrlByKey(imageKey);

            return { ...favorite, image_url };
        })
    );

    return favoritesWithImages;
}

module.exports = { toggleFavorite, listFavorites };