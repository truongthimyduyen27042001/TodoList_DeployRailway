const { Pool } = require('pg');

console.log('🚀 Starting database migration...');

// Database connection configuration
let connectionConfig;

console.log("check process.env 1111: ", {
  databaseUrl: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})


if (process.env.DATABASE_URL) {
  // Use DATABASE_URL if available
  try {
    const url = new URL(process.env.DATABASE_URL);
    console.log('🔗 Connecting to database using DATABASE_URL...');
    console.log('📍 Database host:', url.hostname);
    console.log('📍 Database port:', url.port);
    console.log('📍 Database name:', url.pathname.substring(1));
    
    connectionConfig = {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    };
  } catch (error) {
    console.error('❌ Invalid DATABASE_URL format:', process.env.DATABASE_URL);
    console.error('💡 Expected format: postgresql://user:password@host:port/database');
    console.error('🔍 Error:', error.message);
    process.exit(1);
  }
} else {
  // Use individual environment variables
  console.log('🔗 Connecting to database using individual environment variables...');
  
  const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('💡 Please set DATABASE_URL or all individual DB variables');
    process.exit(1);
  }
  
  connectionConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  };
  
  console.log('📍 Database host:', process.env.DB_HOST);
  console.log('📍 Database port:', process.env.DB_PORT);
  console.log('📍 Database name:', process.env.DB_NAME);
}

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