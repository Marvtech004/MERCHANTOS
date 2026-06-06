import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateTokens(user) {
  const payload = { id: user.id };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' });
  return { accessToken, refreshToken };
}
