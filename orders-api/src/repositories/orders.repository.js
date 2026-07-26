const pool = require('../database/postgres.js')

const saveOrder = async ({ items, total, uuid }) => {
    try {
        const query = 'INSERT INTO orders (id, items, total) VALUES ($1, $2::jsonb, $3) RETURNING id, items, total, created_at, updated_at';
        const params = [uuid, JSON.stringify(items), total];
        const result = await pool.query(query, params);

        return result.rows[0]
    } catch(err) {
        throw err;
    }
}

module.exports = {
    saveOrder,
};
