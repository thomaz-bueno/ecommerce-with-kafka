const { Router } = require('express');
const { authenticate } = require('../middlewares/auth.middleware.js');
const cartController = require('../controllers/cart.controller.js');

const router = Router();

router.post('/', authenticate, cartController.getCartItems);
router.post('/add', authenticate, cartController.addCartItem);

module.exports = router;