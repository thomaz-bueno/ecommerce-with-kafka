require('dotenv').config();
const { connectProducer } = require('./kafka/producer');

const app = require('./app');

const PORT = process.env.PORT || 3000;

(async () => {
  await connectProducer();
  app.listen(PORT, () => {
    console.log(`orders-api listening on port ${PORT}`);
  });
})();

