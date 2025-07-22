const { Pool } = require('pg');

// Database connection configuration
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

const db = new Pool(connectionConfig);

async function runMigrations() {
  try {
    console.log('Starting database migration...');
    
    // Create todos table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Database migration completed successfully');
    
    // Close the connection
    await db.end();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

// Run migrations
runMigrations(); 