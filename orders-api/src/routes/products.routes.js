const { Router } = require('express');
const productsController = require('../controllers/products.controller.js');
const { optionalAuthenticate } = require('../middlewares/optionalAuth.js');

const router = Router();

router.get('/', optionalAuthenticate, productsController.listProducts);
router.get('/:id', optionalAuthenticate, productsController.listOneProduct);

module.exports = router;
