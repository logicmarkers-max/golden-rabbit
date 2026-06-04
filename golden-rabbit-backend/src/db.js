const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || null;

let pool = null;
if (connectionString) {
  pool = new Pool({ connectionString });
} else {
  console.warn('No DATABASE_URL set - DB connection disabled. Set DATABASE_URL in .env to enable PostgreSQL.');
}

module.exports = pool;
