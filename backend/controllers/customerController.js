import { pool } from '../config/db.js';

export async function getCustomers(req, res, next) {
  try {
    const { rows } = await pool.query('SELECT * FROM customers ORDER BY updated_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function getCustomerById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function createCustomer(req, res, next) {
  try {
    const { full_name, email, phone, address, notes } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO customers (full_name, email, phone, address, notes)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [full_name, email, phone, address, notes]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const { full_name, email, phone, address, notes } = req.body;
    const { rows } = await pool.query(
      `UPDATE customers SET full_name = $1, email = $2, phone = $3, address = $4, notes = $5, updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [full_name, email, phone, address, notes, id]
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    next(error);
  }
}
