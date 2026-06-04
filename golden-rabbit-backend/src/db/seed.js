require('dotenv').config();
const pool = require('../db');

if (!pool) {
  console.error('Database not configured. Set DATABASE_URL in .env');
  process.exit(1);
}

const sampleProducts = [
  { name: 'Sky Shot - Aerial', category: 'Sky Shots', price: 199.0, stock: 50 },
  { name: 'Sparkler Pack', category: 'Sparklers & Hand-held', price: 49.0, stock: 200 },
  { name: 'Ground Chakkar', category: 'Ground Chakkars', price: 79.0, stock: 150 },
  { name: 'Flower Pot Fountain', category: 'Flower Pots', price: 129.0, stock: 80 },
  { name: 'Rocket Missile', category: 'Rockets & Missiles', price: 249.0, stock: 40 }
];

async function seed() {
  try {
    for (const p of sampleProducts) {
      const { name, category, price, stock } = p;
      await pool.query(
        `INSERT INTO products (name, category, price, stock) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
        [name, category, price, stock]
      );
    }
    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
