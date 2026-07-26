const ordersRepository = require('../repositories/orders.repository');
const { produceOrderCreated } = require('../kafka/producer')
const crypto = require('crypto');

const createOrder = async (body) => {
  const validationResult = validateOrder(body);

  if (validationResult.valid) {
    const savedOrder = await ordersRepository.saveOrder({
      uuid: createUUID(),
      items: body.items,
      total: validationResult.total,
    });

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

  let total = 0;
  for (const item of items) {
    if (!item?.productId) {
      return {
        valid: false,
        message: "ProductId inválido.",
      };
    }

    if (!isPositiveNumber(item.quantity)) {
      return {
        valid: false,
        message: "Quantidade inválida",
      };
    }

    if (!isPositiveNumber(item.price)) {
      return {
        valid: false,
        message: "Preço inválido",
      };
    }

    total += item.quantity * item.price;
  }

  return {
    valid: true,
    total,
  };
};

const createResponse = ({ valid, message, total = null }) => {
  if (!valid) {
    return {
      status: "failed",
      message,
      total,
    };
  }

  return {
    status: "created",
    message: "Pedido criado com sucesso!",
    total,
  };
};

const isPositiveNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

module.exports = {
  createOrder,
};
