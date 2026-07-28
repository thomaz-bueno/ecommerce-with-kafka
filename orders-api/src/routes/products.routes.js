const { Router } = require('express');
const productsController = require('../controllers/products.controller.js');

const router = Router();

router.get('/', productsController.listProducts);

module.exports = router;