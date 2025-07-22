import pool from "./db.js";

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `);
  console.log("Table 'todos' created (if not exists).");
  process.exit();
}

createTable();



