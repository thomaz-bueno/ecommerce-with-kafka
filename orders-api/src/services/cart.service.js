const cartRepository = require('../repositories/cart.repository.js');
const s3Service = require('./s3.service.js');

const getCartItems = async (id) => {
    const items = await cartRepository.getCartItems(id);

    const itemsWithImages = await Promise.all(
        items.map(async (item) => {
            const imageKey = `imagens/${item.product_id}/${item.color}.png`;
            const image_url = await s3Service.getSignedUrlByKey(imageKey);
            const sizes = await cartRepository.getSizesByProduct(item.product_id, item.color);
            const availableSizes = sizes.map(s => s.size);

            return { ...item, image_url, availableSizes };
        })
    );

    return itemsWithImages;
}

const addCartItem = async ({ user_id, product_id, name, price, color, size, quantity }) => {
    const hasCart = await cartRepository.hasInCart({ user_id, product_id });

    if(hasCart.length > 0) {
        return { message: "Produto já adicionado" };
    }

    const itemAdded = await cartRepository.addCartItem({ user_id, product_id, name, price, color, size, quantity });

    return itemAdded;
}

const updateQuantity = async ({ user_id, cart_item_id, quantity }) => {
    const item = await cartRepository.getCartItemById(cart_item_id);

    if (!item || item.user_id !== user_id) {
        return { status: 'failed', message: 'Item não encontrado no carrinho.' };
    }

    if (quantity <= 0) {
        await cartRepository.removeItem(cart_item_id);
        return { status: 'removed', message: 'Item removido do carrinho.' };
    }

    const updated = await cartRepository.updateQuantity(cart_item_id, quantity);
    return { status: 'updated', item: updated };
};

const updateSize = async ({ user_id, cart_item_id, size }) => {
    const item = await cartRepository.getCartItemById(cart_item_id);

    if (!item || item.user_id !== user_id) {
        return { status: 'failed', message: 'Item não encontrado no carrinho.' };
    }

    const updated = await cartRepository.updateSize(cart_item_id, size);
    return { status: 'updated', item: updated };
};

const removeItem = async ({ user_id, cart_item_id }) => {
    const item = await cartRepository.getCartItemById( user_id, cart_item_id );

    if (!item || item.user_id !== user_id) {
        return { status: 'failed', message: 'Item não encontrado no carrinho.' };
    }

    await cartRepository.removeItem(user_id, cart_item_id);
    return { status: 'removed', message: 'Item removido do carrinho.' };
};

const clearCart = async (user_id) => {
    await cartRepository.clearCart(user_id);
    return { status: 'cleared', message: 'Carrinho esvaziado com sucesso.' };
};

module.exports = { getCartItems, addCartItem, updateQuantity, updateSize, removeItem, clearCart };