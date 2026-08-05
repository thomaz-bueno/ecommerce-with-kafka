const productsRepository = require('../repositories/products.repository.js');
const s3Service = require('../services/s3.service.js');

const listProducts = async (user_id) => {
    const products = await productsRepository.listProducts(user_id);

    const productsWithImages = await Promise.all(
        products.map(async (product) => {
            const imageKey = `imagens/${product.id}/image.png`;
            const image_url = await s3Service.getSignedUrlByKey(imageKey);

            return { ...product, image_url };
        })
    );

    return productsWithImages;
};

const listOneProduct = async ({ id, color, user_id }) => {
    const product = await productsRepository.listOneProduct(id, user_id);
    const variants = await productsRepository.getProductVariants(id);

    const availableColors = [...new Set(variants.map(v => v.color))];
    const selectedColor = color && availableColors.includes(color) ? color : availableColors[0];

    const imageKey = `imagens/${product.id}/${selectedColor}.png`;
    const image_url = await s3Service.getSignedUrlByKey(imageKey);

    return { 
        ...product, 
        image_url,
        selectedColor,
        availableColors,
        variants, 
    };
}

module.exports = { listProducts, listOneProduct };
