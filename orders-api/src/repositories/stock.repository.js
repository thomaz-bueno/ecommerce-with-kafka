const pool = require('../database/postgres.js');

const getStock = async (productId) => {
    const result = await pool.query(
        'SELECT quantity FROM stock WHERE product_id = $1',
        [productId]
    );
    return result.rows[0];
}

const deductStock = async (productId, quantity) => {
    const result = await pool.query(
        `UPDATE stock
         SET quantity = GREATEST(quantity - $1, 0),
             updated_at = NOW()
         WHERE product_id = $2
         RETURNING product_id, quantity`,
         [quantity, productId]
    );
    return result.rows[0];
}

const upsertStock = async (productId, quantity) => {
    const result = await pool.query(
        `INSERT INTO stock (product_id, quantity)
         VALUES ($1, $2)
         ON CONFLICT (product_id) DO UPDATE
         SET quantity = stock.quantity + $2,
             updated_at = NOW()
         RETURNING product_id, quantity`,
         [productId, quantity]
    );
    return result.rows[0];
}

module.exports = { getStock, deductStock, upsertStock };