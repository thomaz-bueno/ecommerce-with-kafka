const pool = require('../database/postgres.js')

const saveOrder = async ({ items, total, uuid }) => {
    try {
        const query = `INSERT INTO orders (id, items, total) 
                        VALUES ($1, $2::jsonb, $3) 
                        RETURNING id, items, total, created_at, updated_at`;
        const params = [uuid, JSON.stringify(items), total];
        const result = await pool.query(query, params);

        return result.rows[0]
    } catch(err) {
        throw err;
    }
}

const getPricesByVariants = async (items) => {
    const values = [];
    const placeholders = [];

    items.forEach((item, i) => {
        const idx = i * 3;
        placeholders.push(`($${idx + 1}, $${idx + 2}, $${idx + 3})`);
        values.push(item.productId, item.color, item.size);
    })

    const result = await pool.query(`
        SELECT product_id, color, size, price
        FROM product_variants
        WHERE (product_id, color, size) IN (${placeholders.join(', ')});    
    `, values);

    const itemsWithPrice = items.map((item) => {
        const found = result.rows.find(
            (p) => p.product_id == item.productId && p.color === item.color && p.size === item.size
        );

        if (!found) {
            throw new Error(`Variante não encontrada: produto ${item.productId}, cor ${item.color}, tamanho ${item.size}`);
        }

        return { ...item, price: Number(found.price) };
    });

    return itemsWithPrice;
}

module.exports = {
    saveOrder,
    getPricesByVariants
};
