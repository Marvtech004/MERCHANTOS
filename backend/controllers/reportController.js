import { pool } from '../config/db.js';

export async function getReports(req, res, next) {
  try {
    const { rows } = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function generateReport(req, res, next) {
  try {
    const { type, filters } = req.body;
    const payload = { type, filters, generatedAt: new Date().toISOString() };

    const { rows } = await pool.query(
      'INSERT INTO reports (type, generated_by, payload) VALUES ($1, $2, $3) RETURNING *',
      [type, req.user.id, payload]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}
