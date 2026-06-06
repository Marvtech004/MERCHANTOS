import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { generateTokens } from '../utils/jwt.js';

export async function registerUser(req, res, next) {
  try {
    const { email, password, full_name, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, full_name, role_id) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, role_id',
      [email, hashedPassword, full_name, role_id || 4]
    );

    const tokens = generateTokens(rows[0]);
    await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, rows[0].id]);

    res.status(201).json({ user: rows[0], accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query('SELECT id, email, password_hash, full_name, role_id FROM users WHERE email = $1', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const tokens = generateTokens(user);
    await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, user.id]);

    res.json({ user: { id: user.id, email: user.email, full_name: user.full_name, role_id: user.role_id }, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401);
      throw new Error('Refresh token required');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { rows } = await pool.query('SELECT id, refresh_token FROM users WHERE id = $1', [decoded.id]);
    const user = rows[0];

    if (!user || user.refresh_token !== refreshToken) {
      res.status(401);
      throw new Error('Invalid refresh token');
    }

    const tokens = generateTokens({ id: decoded.id });
    await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, decoded.id]);

    res.json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const { id } = req.user;
    const { rows } = await pool.query('SELECT id, email, full_name, role_id, avatar_url FROM users WHERE id = $1', [id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { id } = req.user;
    const { full_name, avatar_url } = req.body;

    const { rows } = await pool.query(
      'UPDATE users SET full_name = $1, avatar_url = $2, updated_at = NOW() WHERE id = $3 RETURNING id, email, full_name, role_id, avatar_url',
      [full_name, avatar_url, id]
    );

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}
