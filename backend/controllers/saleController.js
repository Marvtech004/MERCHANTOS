import { pool } from '../config/db.js';

export async function getSales(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT s.*, u.full_name AS cashier_name, c.full_name AS customer_name
       FROM sales s
       LEFT JOIN users u ON s.user_id = u.id
       LEFT JOIN customers c ON s.customer_id = c.id
       ORDER BY s.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function getSaleById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function createSale(req, res, next) {
  try {
    const { customer_id, payment_method, subtotal, tax, discount, total, items } = req.body;
    const invoiceNumber = `INV-${Date.now()}`;

    const saleResult = await pool.query(
      `INSERT INTO sales (invoice_number, customer_id, user_id, payment_method, subtotal, tax, discount, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, invoice_number, customer_id, payment_method, subtotal, tax, discount, total, created_at`,
      [invoiceNumber, customer_id, req.user.id, payment_method, subtotal, tax, discount, total]
    );

    const sale = saleResult.rows[0];
    const itemPromises = items.map(async (item) => {
      await pool.query(
        `INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, total_price)
         VALUES ($1,$2,$3,$4,$5)`,
        [sale.id, item.product_id, item.quantity, item.unit_price, item.total_price]
      );
      await pool.query('UPDATE products SET quantity = quantity - $1, updated_at = NOW() WHERE id = $2', [item.quantity, item.product_id]);
    });

    await Promise.all(itemPromises);

    res.status(201).json({ sale, items });
  } catch (error) {
    next(error);
  }
}

export async function getSalesSummary(req, res, next) {
  try {
    const todaySales = await pool.query('SELECT COUNT(*) AS count, SUM(total) AS revenue FROM sales WHERE created_at >= CURRENT_DATE');
    const monthlySales = await pool.query('SELECT COUNT(*) AS count, SUM(total) AS revenue FROM sales WHERE DATE_TRUNC(\'month\', created_at) = DATE_TRUNC(\'month\', CURRENT_DATE)');
    res.json({ today: todaySales.rows[0], month: monthlySales.rows[0] });
  } catch (error) {
    next(error);
  }
}
