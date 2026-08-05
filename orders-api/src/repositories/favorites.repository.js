const pool = require('../database/postgres.js');

const findByUserAndProduct = async ({ user_id, product_id }) => {
    const result = await pool.query(`
        SELECT id FROM favorites
        WHERE user_id = $1 AND product_id = $2;    
    `, [user_id, product_id]);

    return result.rows[0];
};

const listByUser = async (user_id) => {
    const result = await pool.query(`
        SELECT
            f.id,
            f.product_id,
            p.name,
            p.description,
            p.base_price
        FROM favorites f
        INNER JOIN products p ON p.id = f.product_id
        WHERE f.user_id = $1
        ORDER BY f.created_at DESC;
    `, [user_id]);

    return result.rows;
}

const add = async ({ user_id, product_id }) => {
    const result = await pool.query(`
        INSERT INTO favorites (user_id, product_id)
        VALUES ($1, $2)
        RETURNING *;    
    `, [user_id, product_id]);

    return result.rows[0];
};

const remove = async ({ user_id, product_id }) => {
    const result = await pool.query(`
        DELETE FROM favorites
        WHERE user_id = $1 AND product_id = $2
        RETURNING *;    
    `, [user_id, product_id]);

    return result.rows[0];
};

module.exports = { findByUserAndProduct, listByUser, add, remove };