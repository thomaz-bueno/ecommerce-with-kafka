const ordersRepository = require('../repositories/orders.repository.js');
const cartRepository = require('../repositories/cart.repository.js');
const { produceOrderCreated } = require('../kafka/producer')
const crypto = require('crypto');

const createOrder = async (body, user_id) => {
  const validationResult = validateOrder(body);

  if (validationResult.valid) {
    const productsWithPrices = await ordersRepository.getPricesByVariants(body.items);
    
    const total = calculateTotalPrice(productsWithPrices);

    const savedOrder = await ordersRepository.saveOrder({
      uuid: createUUID(),
      items: productsWithPrices,
      total,
      user_id
    });

    await cartRepository.clearCart(user_id);

    await produceOrderCreated(savedOrder);
  }

  return createResponse(validationResult);
};

const createUUID = () => {
  return crypto.randomUUID();
}

const validateOrder = (body = {}) => {
  const { items } = body;

  if (!Array.isArray(items)) {
    return {
      valid: false,
      message: "A variável 'items' tem que ser um array.",
    };
  }

  if (items.length === 0) {
    return {
      valid: false,
      message: "A variável 'items' está vazia",
    };
  }

  for (const item of items) {
    if (!item?.productId) {
      return {
        valid: false,
        message: "ProductId inválido.",
      };
    }

    if (!item?.color || !item?.size) {
      return {
        valid: false,
        message: "Todos os items devem ter size e color.",
      };
    }

    if (!isPositiveNumber(item.quantity)) {
      return {
        valid: false,
        message: "Quantidade inválida",
      };
    }
  }

  return {
    valid: true,
  };
};

const createResponse = ({ valid, message }) => {
  if (!valid) {
    return {
      status: "failed",
      message,
    };
  }

  return {
    status: "created",
    message: "Pedido criado com sucesso!",
  };
};

const isPositiveNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;


const calculateTotalPrice = (items) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Number(total.toFixed(2));
}

const listOrders = async (userId) => {
  const orders = await ordersRepository.listOrders(userId);

  return orders;
}

module.exports = {
  createOrder,
  listOrders
};
