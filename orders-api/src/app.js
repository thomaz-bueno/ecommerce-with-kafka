const express = require('express');

const ordersRouter = require('./routes/orders.routes');

const app = express();

app.use(express.json());

app.get('/health', (_request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use('/orders', ordersRouter);

module.exports = app;
