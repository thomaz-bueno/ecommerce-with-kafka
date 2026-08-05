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
            COALESCE(f.id IS NOT NULL) AS is_liked
        FROM cart c
        LEFT JOIN favorites f
            ON f.product_id = c.product_id
            AND f.user_id = c.user_id
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

const hasInCart = async ({ user_id, product_id }) => {
    const result = await pool.query(`
        SELECT 
            c.id,
            c.product_id,
            c.name,
            c.price,
            c.color,
            c.size,
            c.quantity
        FROM cart c
        WHERE c.user_id = $1 AND c.product_id = $2;
    `, [user_id, product_id]);
    
    return result.rows;
}

module.exports = { getCartItems, addCartItem, hasInCart };