const { Pool } = require('pg');

console.log('🚀 Starting database migration...');

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  console.log('💡 Please ensure DATABASE_URL is configured in Railway');
  process.exit(1);
}

// Database connection configuration
const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

console.log('🔗 Connecting to database...');
console.log('📍 Database host:', new URL(process.env.DATABASE_URL).hostname);

const db = new Pool(connectionConfig);

async function runMigrations() {
  try {
    console.log('📊 Creating todos table...');
    
    // Create todos table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Database migration completed successfully!');
    
    // Close the connection
    await db.end();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database migration failed:', error.message);
    console.error('🔍 Error details:', error);
    process.exit(1);
  }
}

// Run migrations
runMigrations(); 