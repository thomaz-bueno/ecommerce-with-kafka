const pool = require('../database/postgres.js');

const getCartItems = async (id) => {
    const result = await pool.query(`
        SELECT 
            c.id,
            c.product_id,
            c.name,
            c.price,
            c.color,
            c.size,
            c.quantity,
            c.is_liked
        FROM cart c
        WHERE c.user_id = $1;
    `, [id]);

    return result.rows;
}

const addCartItem = async ({ user_id, product_id, name, price, color, size, quantity }) => {
    const result = await pool.query(`
        INSERT INTO cart (user_id, product_id, name, price, color, size, quantity)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `, [user_id, product_id, name, price, color, size, quantity]);

    return result.rows[0];
}

module.exports = { getCartItems, addCartItem };