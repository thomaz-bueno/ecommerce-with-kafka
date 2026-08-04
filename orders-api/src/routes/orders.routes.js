const { Router } = require('express');
const { authenticate } = require('../middlewares/auth.middleware.js');
const ordersController = require('../controllers/orders.controller')

const router = Router();

router.post("/", authenticate, ordersController.createOrder)

module.exports = router;
