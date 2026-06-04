require('dotenv').config();
const { Client } = require('pg');
const url = require('url');

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error('No DATABASE_URL in environment');
  process.exit(1);
}

// parse and connect to default 'postgres' database to create target DB
const parsed = new url.URL(raw);
const targetDb = parsed.pathname ? parsed.pathname.replace(/\//, '') : null;
if (!targetDb) {
  console.error('Could not determine target DB name from DATABASE_URL');
  process.exit(1);
}

// connect to 'postgres' database for administrative commands
parsed.pathname = '/postgres';
const adminUrl = parsed.toString();

async function ensureDb() {
  const client = new Client({ connectionString: adminUrl });
  await client.connect();
  try {
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [targetDb]);
    if (res.rows.length) {
      console.log(`Database '${targetDb}' already exists`);
    } else {
      console.log(`Creating database '${targetDb}'...`);
      await client.query(`CREATE DATABASE "${targetDb}"`);
      console.log('Created.');
    }
  } catch (err) {
    console.error('Error ensuring database:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

ensureDb();
