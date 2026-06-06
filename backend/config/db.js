import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || 'postgres://merchantos:merchantos123@localhost:5432/merchantos';

export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

export async function connectDb() {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to PostgreSQL database');
    return true;
  } catch (error) {
    console.error('PostgreSQL connection error:', error?.message || error);
    console.warn('Continuing without DB connection — some endpoints will fail until the database is available.');
    // Do not exit the process so the backend can start for local development
    // and display health/status pages even when Postgres is not ready.
    return false;
  }
}
