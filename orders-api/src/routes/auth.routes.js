const { Router } = require('express');
const authController = require('../controllers/auth.controller.js');
const { authenticate } = require('../middlewares/auth.middleware.js');

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);

module.exports = router;