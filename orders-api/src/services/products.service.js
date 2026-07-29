const productsRepository = require('../repositories/products.repository.js');
const s3Service = require('../services/s3.service.js');

const listProducts = async () => {
    const products = await productsRepository.listProducts();

    const productsWithImages = await Promise.all(
        products.map(async (product) => {
            const imageKey = `imagens/${product.id}/image.png`;
            const image_url = await s3Service.getSignedUrlByKey(imageKey);

            return { ...product, image_url };
        })
    );

    return productsWithImages;
};

const listOneProduct = async (id) => {
    const product = await productsRepository.listOneProduct(id);

    const imageKey = `imagens/${product.id}/image.png`;
    const image_url = await s3Service.getSignedUrlByKey(imageKey);

    return { ...product, image_url };
}

module.exports = { listProducts, listOneProduct };