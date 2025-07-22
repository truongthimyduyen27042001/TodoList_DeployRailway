import { Pool } from "pg";

// Railway Database URL format or individual env vars
const connectionConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
} : {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'todo_user',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'todo_db',
};

export const db = new Pool(connectionConfig);

// Test database connection
db.on('connect', () => {
  console.log('Connected to database');
});

db.on('error', (err) => {
  console.error('Database connection error:', err);
});