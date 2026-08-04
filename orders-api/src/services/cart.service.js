const cartRepository = require('../repositories/cart.repository.js');
const s3Service = require('./s3.service.js');

const getCartItems = async ({ id }) => {
    const items = await cartRepository.getCartItems(id);
    
    const itemsWithImages = await Promise.all(
        items.map(async (item) => {
            const imageKey = `imagens/${item.product_id}/${item.color}.png`;
            const image_url = await s3Service.getSignedUrlByKey(imageKey);

            return { ...item, image_url };
        })
    );

    return itemsWithImages;
}

const addCartItem = async ({ user_id, product_id, name, price, color, size, quantity }) => {
    const itemAdded = await cartRepository.addCartItem({ user_id, product_id, name, price, color, size, quantity });

    return itemAdded;
}

module.exports = { getCartItems, addCartItem };