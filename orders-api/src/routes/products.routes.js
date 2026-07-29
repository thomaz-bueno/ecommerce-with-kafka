const { Router } = require('express');
const productsController = require('../controllers/products.controller.js');

const router = Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.listOneProduct);

module.exports = router;