import { pool } from '../config/db.js';

export async function getProducts(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.updated_at DESC`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { name, sku, barcode, cost_price, selling_price, quantity, category_id, description, image_url, low_stock_threshold } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO products (name, sku, barcode, cost_price, selling_price, quantity, category_id, description, image_url, low_stock_threshold)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [name, sku, barcode, cost_price, selling_price, quantity, category_id, description, image_url, low_stock_threshold || 5]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, sku, barcode, cost_price, selling_price, quantity, category_id, description, image_url, low_stock_threshold } = req.body;
    const { rows } = await pool.query(
      `UPDATE products SET name = $1, sku = $2, barcode = $3, cost_price = $4, selling_price = $5, quantity = $6,
       category_id = $7, description = $8, image_url = $9, low_stock_threshold = $10, updated_at = NOW()
       WHERE id = $11 RETURNING *`,
      [name, sku, barcode, cost_price, selling_price, quantity, category_id, description, image_url, low_stock_threshold, id]
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getLowStockProducts(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE quantity <= low_stock_threshold ORDER BY quantity ASC'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
}
