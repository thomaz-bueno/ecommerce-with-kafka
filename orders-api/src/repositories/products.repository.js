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

module.exports = { listProducts, listOneProduct };