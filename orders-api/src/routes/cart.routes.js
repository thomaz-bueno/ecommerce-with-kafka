const { Router } = require('express');
const { authenticate } = require('../middlewares/auth.middleware.js');
const cartController = require('../controllers/cart.controller.js');

const router = Router();

router.get('/', authenticate, cartController.getCartItems);
router.post('/add', authenticate, cartController.addCartItem);
router.put('/update-quantity', authenticate, cartController.updateQuantity);
router.put('/update-size', authenticate, cartController.updateSize);
router.delete('/remove/:id', authenticate, cartController.removeItem);
router.delete('/clear', authenticate, cartController.clearCart);

module.exports = router;
