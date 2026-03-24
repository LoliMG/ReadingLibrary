import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const useSsl =
  process.env.DB_SSL === '0' || process.env.DB_SSL === 'false'
    ? false
    : process.env.DB_SSL === '1' ||
      process.env.DB_SSL === 'true' ||
      process.env.VERCEL === '1';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ...(useSsl ? { ssl: { rejectUnauthorized: true } } : {}),
});

export default pool;
