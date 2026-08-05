const pool = require('../database/postgres.js');

const listProducts = async (user_id) => {
    const result = await pool.query(`
        SELECT 
            p.id,
            p.name,
            p.description,
            p.base_price,
            EXISTS(
                SELECT 1 FROM favorites 
                WHERE user_id = $1::UUID AND product_id = p.id
            ) AS is_liked
        FROM products p;
    `, [user_id]);

    return result.rows;
}

const listOneProduct = async (id, user_id) => {
    const query = `
        SELECT 
            p.id,
            p.name,
            p.description,
            p.base_price,
            EXISTS(
                SELECT 1 FROM favorites 
                WHERE user_id = $1::UUID AND product_id = p.id
            ) AS is_liked
        FROM products p
        WHERE p.id = $2;`
        
    const result = await pool.query(query, [user_id, id]);
    return result.rows[0];
}

const getProductVariants = async (id) => {
    const result = await pool.query(`
        SELECT
            v.id,
            v.product_id,
            v.color,
            v.size,
            v.price,
            v.stock
        FROM product_variants v
        WHERE v.product_id = $1
        ORDER BY v.id ASC
    `, [id]);

    return result.rows;
}

module.exports = { listProducts, listOneProduct, getProductVariants };
