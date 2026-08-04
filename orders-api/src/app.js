const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ordersRouter = require('./routes/orders.routes.js');
const productsRouter = require('./routes/products.routes.js');
const authRouter = require('./routes/auth.routes.js');
const cartRouter = require('./routes/cart.routes.js');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use('/orders', ordersRouter);

app.use('/products', productsRouter);

app.use('/auth', authRouter);

app.use('/cart', cartRouter);

module.exports = app;
