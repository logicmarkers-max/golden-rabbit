const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('No DATABASE_URL set in environment. Aborting migrations.');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '..', '..', 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
  console.log(`Found ${files.length} migration(s)`);
  for (const file of files) {
    const full = path.join(migrationsDir, file);
    const sql = fs.readFileSync(full, 'utf8');
    console.log(`Running ${file}...`);
    try {
      await pool.query(sql);
      console.log(`${file} OK`);
    } catch (err) {
      console.error(`Error running ${file}:`, err.message);
      await pool.end();
      process.exit(1);
    }
  }
  console.log('Migrations complete.');
  await pool.end();
}

runMigrations().catch(err => {
  console.error('Migration runner failed:', err);
  process.exit(1);
});
