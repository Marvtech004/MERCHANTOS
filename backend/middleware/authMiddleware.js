import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../config/db.js';

dotenv.config();

export async function protect(req, res, next) {
  let token = req.headers.authorization?.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query('SELECT id, email, full_name, role_id FROM users WHERE id = $1', [decoded.id]);
    const user = rows[0];

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token invalid');
  }
}
