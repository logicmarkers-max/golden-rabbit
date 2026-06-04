const express = require('express');
const router = express.Router();
const pool = require('../db');

// Mock product data - used as a fallback when DB is not configured
const mockProducts = [
  // Sky Shots (Aerial Fireworks)
  { 
    id: 1, 
    name: 'Sky Shot - Aerial', 
    price: 199, 
    category: 'Sky Shots',
    inStock: true,
    stock: 50,
    description: 'Beautiful aerial fireworks that burst high in the sky with golden sparkles',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 249,
    specifications: { noiseLevel: 'High', ageLimit: '18+', duration: '8-10 seconds' },
    reviews: { average: 4.5, count: 24 },
    tags: ['Popular', 'Festival', 'Sky']
  },
  { 
    id: 2, 
    name: 'Premium Sky Burst', 
    price: 299, 
    category: 'Sky Shots',
    inStock: true,
    stock: 35,
    description: 'Premium aerial fireworks with multi-color burst patterns',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 379,
    specifications: { noiseLevel: 'High', ageLimit: '18+', duration: '10-12 seconds' },
    reviews: { average: 4.7, count: 42 },
    tags: ['Premium', 'Colors', 'Festival']
  },
  
  // Sparklers & Hand-held
  { 
    id: 3, 
    name: 'Sparkler Pack', 
    price: 49, 
    category: 'Sparklers & Hand-held',
    inStock: true,
    stock: 100,
    description: 'Safe hand-held sparklers perfect for kids and family celebrations',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 59,
    specifications: { noiseLevel: 'Silent', ageLimit: '5+', duration: '30-40 seconds' },
    reviews: { average: 4.8, count: 156 },
    tags: ['Safe', 'Family', 'Hand-held']
  },
  { 
    id: 4, 
    name: 'Gold Sparklers Bundle', 
    price: 129, 
    category: 'Sparklers & Hand-held',
    inStock: true,
    stock: 60,
    description: 'Bundle of 24 gold sparklers with extended burn time',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 159,
    specifications: { noiseLevel: 'Silent', ageLimit: '5+', duration: '50-60 seconds' },
    reviews: { average: 4.6, count: 78 },
    tags: ['Bundle', 'Gold', 'Long-lasting']
  },

  // Ground Chakkars
  { 
    id: 5, 
    name: 'Ground Chakkar', 
    price: 79, 
    category: 'Ground Chakkars',
    inStock: true,
    stock: 75,
    description: 'Spinning ground fireworks that rotate on the ground creating a magical effect',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 99,
    specifications: { noiseLevel: 'Medium', ageLimit: '10+', duration: '20-30 seconds' },
    reviews: { average: 4.3, count: 89 },
    tags: ['Spinning', 'Colorful', 'Popular']
  },
  { 
    id: 6, 
    name: 'Multi-Color Chakkar', 
    price: 99, 
    category: 'Ground Chakkars',
    inStock: true,
    stock: 45,
    description: 'Ground spinning fireworks with vibrant multi-color effects',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 129,
    specifications: { noiseLevel: 'Medium', ageLimit: '10+', duration: '25-35 seconds' },
    reviews: { average: 4.4, count: 65 },
    tags: ['Colors', 'Spinning', 'Festival']
  },

  // Flower Pots (Fountains)
  { 
    id: 7, 
    name: 'Flower Pot Fountain', 
    price: 149, 
    category: 'Flower Pots',
    inStock: true,
    stock: 55,
    description: 'Beautiful fountain fireworks that spray sparks like a blooming flower',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 199,
    specifications: { noiseLevel: 'Medium', ageLimit: '12+', duration: '15-20 seconds' },
    reviews: { average: 4.6, count: 102 },
    tags: ['Fountain', 'Beautiful', 'Festival']
  },
  { 
    id: 8, 
    name: 'Premium Fountain Mix', 
    price: 249, 
    category: 'Flower Pots',
    inStock: true,
    stock: 30,
    description: 'Assorted premium fountain fireworks in various colors',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 329,
    specifications: { noiseLevel: 'Medium', ageLimit: '12+', duration: '20-25 seconds' },
    reviews: { average: 4.7, count: 45 },
    tags: ['Premium', 'Assorted', 'Fountain']
  },

  // Rockets & Missiles
  { 
    id: 9, 
    name: 'Flying Rocket', 
    price: 89, 
    category: 'Rockets & Missiles',
    inStock: true,
    stock: 40,
    description: 'Exciting flying rocket fireworks that launch high in the sky',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 119,
    specifications: { noiseLevel: 'High', ageLimit: '16+', duration: '5-8 seconds' },
    reviews: { average: 4.4, count: 71 },
    tags: ['Rocket', 'Flying', 'Exciting']
  },
  { 
    id: 10, 
    name: 'Deluxe Missile Pack', 
    price: 199, 
    category: 'Rockets & Missiles',
    inStock: true,
    stock: 25,
    description: 'Pack of premium missiles with powerful thrust and colorful burst',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 259,
    specifications: { noiseLevel: 'High', ageLimit: '16+', duration: '10-12 seconds' },
    reviews: { average: 4.5, count: 38 },
    tags: ['Missile', 'Premium', 'Pack']
  },

  // Gift Boxes & Combos
  { 
    id: 11, 
    name: 'Diwali Gift Box', 
    price: 499, 
    category: 'Gift Boxes & Combos',
    inStock: true,
    stock: 20,
    description: 'Comprehensive gift box with assorted fireworks for complete celebration',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 649,
    specifications: { noiseLevel: 'Mixed', ageLimit: '10+', duration: 'Mixed' },
    reviews: { average: 4.8, count: 156 },
    tags: ['Gift', 'Combo', 'Festival']
  },
  { 
    id: 12, 
    name: 'Family Festival Combo', 
    price: 799, 
    category: 'Gift Boxes & Combos',
    inStock: true,
    stock: 15,
    description: 'Premium combo pack perfect for family celebrations with variety',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 1049,
    specifications: { noiseLevel: 'Mixed', ageLimit: '10+', duration: 'Mixed' },
    reviews: { average: 4.9, count: 89 },
    tags: ['Premium', 'Family', 'Combo']
  },

  // Sound Crackers
  { 
    id: 13, 
    name: 'Classic Sound Cracker', 
    price: 39, 
    category: 'Sound Crackers',
    inStock: true,
    stock: 120,
    description: 'Traditional sound crackers that produce a loud festive noise',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 49,
    specifications: { noiseLevel: 'Very High', ageLimit: '16+', duration: '1-2 seconds' },
    reviews: { average: 4.2, count: 203 },
    tags: ['Sound', 'Traditional', 'Festival']
  },
  { 
    id: 14, 
    name: 'Mega Boom Pack', 
    price: 149, 
    category: 'Sound Crackers',
    inStock: true,
    stock: 50,
    description: 'Pack of extra-loud boom crackers for a thunderous celebration',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 199,
    specifications: { noiseLevel: 'Very High', ageLimit: '16+', duration: '2-3 seconds' },
    reviews: { average: 4.3, count: 95 },
    tags: ['Loud', 'Boom', 'Pack']
  },

  // Novelty Items
  { 
    id: 15, 
    name: 'Color Smoke Bombs', 
    price: 59, 
    category: 'Novelty Items',
    inStock: true,
    stock: 80,
    description: 'Colorful smoke-producing novelty items perfect for photography',
    images: ['/images/placeholder-product.svg'],
    featured: false,
    originalPrice: 79,
    specifications: { noiseLevel: 'Silent', ageLimit: '8+', duration: '30-45 seconds' },
    reviews: { average: 4.7, count: 134 },
    tags: ['Novelty', 'Smoke', 'Photography']
  },
  { 
    id: 16, 
    name: 'LED Light Show', 
    price: 199, 
    category: 'Novelty Items',
    inStock: true,
    stock: 35,
    description: 'Modern LED-based light show novelty items for unique celebrations',
    images: ['/images/placeholder-product.svg'],
    featured: true,
    originalPrice: 279,
    specifications: { noiseLevel: 'Silent', ageLimit: '5+', duration: '60 seconds' },
    reviews: { average: 4.8, count: 67 },
    tags: ['LED', 'Modern', 'Novelty']
  }
];

function mapDbRowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    stock: row.stock,
    inStock: row.stock > 0,
    description: row.description || null,
    images: [],
    featured: row.featured || false,
    originalPrice: row.original_price || null,
    specifications: null,
    reviews: null,
    tags: []
  };
}

// GET /api/products - list products (from DB if configured, otherwise mock)
router.get('/', async (req, res, next) => {
  try {
    if (pool) {
      try {
        const { rows } = await pool.query('SELECT id, name, category, price, stock, NULL::text AS description, NULL::boolean AS featured, NULL::numeric AS original_price FROM products ORDER BY id');
        const products = rows.map(mapDbRowToProduct);
        return res.json({ products });
      } catch (dbErr) {
        console.error('Database query failed, falling back to mock data:', dbErr.message);
        // Fall through to mock data below
      }
    }
    return res.json({ products: mockProducts });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id - product detail
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (pool) {
      try {
        const { rows } = await pool.query('SELECT id, name, category, price, stock, NULL::text AS description, NULL::boolean AS featured, NULL::numeric AS original_price FROM products WHERE id = $1 LIMIT 1', [id]);
        const row = rows[0];
        if (row) return res.json({ product: mapDbRowToProduct(row) });
        // If row not found in DB, we still check mock data or return 404
      } catch (dbErr) {
        console.error(`Database query for product ${id} failed, falling back to mock data:`, dbErr.message);
      }
    }
    const p = mockProducts.find(x => x.id === id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: p });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
