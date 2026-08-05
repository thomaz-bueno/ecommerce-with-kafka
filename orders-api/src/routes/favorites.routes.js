const { Router } = require('express');
const { authenticate } = require('../middlewares/auth.middleware.js');
const favoritesController = require('../controllers/favorites.controller.js');

const router = Router();

router.get('/', authenticate, favoritesController.listFavorites);
router.post('/toggle', authenticate, favoritesController.toggleFavorite);

module.exports = router;