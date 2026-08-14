const pool = require('../database/postgres.js');

const deductStock = async (productId, color, size, quantity, client = pool) => {
    const result = await client.query(
        `UPDATE product_variants
         SET stock = GREATEST(stock - $1, 0)
         WHERE product_id = $2
           AND color = $3
           AND size = $4
           AND stock >= $1
         RETURNING id, product_id, color, size, stock`,
        [quantity, productId, color, size]
    );

    return result.rowCount;
};

const deductStockForOrder = async (items) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const item of items) {
            const rowCount = await deductStock(
                item.productId,
                item.color,
                item.size,
                item.quantity,
                client
            );

            if (rowCount === 0) {
                throw new Error(
                    `Estoque insuficiente ou variante inexistente: produto ${item.productId}, cor ${item.color}, tamanho ${item.size}`
                );
            }
        }

        await client.query('COMMIT');
        return { success: true };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = { deductStock, deductStockForOrder };
