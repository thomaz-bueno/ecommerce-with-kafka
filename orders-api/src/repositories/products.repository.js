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

module.exports = { listProducts };