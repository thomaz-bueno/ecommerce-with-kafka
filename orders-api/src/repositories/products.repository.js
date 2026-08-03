const pool = require('../database/postgres.js');

const listProducts = async () => {
    const result = await pool.query(`
        SELECT 
            p.id,
            p.name,
            p.description,
            p.base_price
        FROM products p;
    `);

    return result.rows;
}

const listOneProduct = async (id) => {
    const result = await pool.query(`
        SELECT 
            p.id,
            p.name,
            p.description,
            p.base_price
        FROM products p
        WHERE p.id = $1;
    `, [id]);

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