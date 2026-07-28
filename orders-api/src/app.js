const express = require('express');
const cors = require('cors');

const ordersRouter = require('./routes/orders.routes.js');
const productsRouter = require('./routes/products.routes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use('/orders', ordersRouter);

app.use('/products', productsRouter);

module.exports = app;
