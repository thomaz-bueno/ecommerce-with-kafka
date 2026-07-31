const { Router } = require('express');
const ordersController = require('../controllers/orders.controller')
const { authenticate } = require('../middlewares/auth.middleware.js');

const router = Router();

router.post("/", ordersController.createOrder)

module.exports = router;
