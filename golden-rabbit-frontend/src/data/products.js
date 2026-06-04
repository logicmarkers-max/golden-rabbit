// Sample Products Database for Golden Rabbit Cracker Shop
export const crackerCategories = [
  {
    id: 'sky-shots',
    name: 'Sky Shots',
    description: 'Spectacular aerial fireworks that burst high in the sky',
    image: '/images/categories/sky-shots.svg',
    icon: '🎆'
  },
  {
    id: 'ground-chakkars',
    name: 'Ground Chakkars',
    description: 'Spinning wheel fireworks that create beautiful ground displays',
    image: '/images/categories/ground-chakkars.svg',
    icon: '🎡'
  },
  {
    id: 'flower-pots',
    name: 'Flower Pots',
    description: 'Fountain-style fireworks with colorful sparks and effects',
    image: '/images/categories/flower-pots.svg',
    icon: '⛲'
  },
  {
    id: 'rockets',
    name: 'Rockets',
    description: 'High-flying rockets with spectacular aerial bursts',
    image: '/images/categories/rockets.svg',
    icon: '🚀'
  },
  {
    id: 'sparklers',
    name: 'Sparklers',
    description: 'Hand-held sparklers perfect for celebrations',
    image: '/images/categories/sparklers.svg',
    icon: '✨'
  },
  {
    id: 'gift-boxes',
    name: 'Gift Boxes',
    description: 'Curated cracker collections for special occasions',
    image: '/images/categories/gift-boxes.svg',
    icon: '🎁'
  },
  {
    id: 'sound-crackers',
    name: 'Sound Crackers',
    description: 'Loud celebration crackers for festive occasions',
    image: '/images/categories/sound-crackers.svg',
    icon: '💥'
  },
  {
    id: 'novelty',
    name: 'Novelty Items',
    description: 'Unique and fun fireworks for special moments',
    image: '/images/categories/novelty.svg',
    icon: '🎪'
  }
];

export const sampleProducts = [
  // Sky Shots
  {
    id: 'ss001',
    name: 'Golden Glory Sky Shot',
    category: 'sky-shots',
    price: 299,
    originalPrice: 350,
    description: 'Premium sky shot with golden chrysanthemum burst and long-lasting sparkles. Perfect for grand celebrations.',
    features: [
      'Height: 50+ meters',
      'Duration: 8-10 seconds',
      'Color: Golden with silver tips',
      'Sound Level: Medium',
      'Safety Certified'
    ],
    specifications: {
      height: '50+ meters',
      duration: '8-10 seconds',
      colors: ['Gold', 'Silver'],
      noiseLevel: 'Medium',
      safetyRating: 5,
      ageLimit: '8+'
    },
    images: ['/images/products/golden-glory-1.jpg'],
    videoUrl: '/videos/golden-glory-demo.mp4',
    stock: 150,
    inStock: true,
    featured: true,
    tags: ['premium', 'gold', 'diwali', 'wedding'],
    brand: 'Golden Rabbit',
    weight: '45g',
    safetyInstructions: [
      'Light the fuse and move away immediately',
      'Do not hold in hand',
      'Keep away from children under 8',
      'Use in open area only'
    ],
    reviews: {
      average: 4.5,
      count: 127,
      ratings: { 5: 80, 4: 35, 3: 8, 2: 3, 1: 1 }
    }
  },
  {
    id: 'ss002',
    name: 'Rainbow Burst Sky Shot',
    category: 'sky-shots',
    price: 249,
    originalPrice: 299,
    description: 'Multi-colored sky shot with rainbow effect burst. Creates a spectacular display of colors in the night sky.',
    features: [
      'Height: 45+ meters',
      'Duration: 6-8 seconds',
      'Multi-color rainbow effect',
      'Sound Level: Medium',
      'Eco-friendly composition'
    ],
    specifications: {
      height: '45+ meters',
      duration: '6-8 seconds',
      colors: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
      noiseLevel: 'Medium',
      safetyRating: 5,
      ageLimit: '8+'
    },
    images: ['/images/products/rainbow-burst-1.jpg'],
    videoUrl: '/videos/rainbow-burst-demo.mp4',
    stock: 200,
    inStock: true,
    featured: false,
    tags: ['colorful', 'rainbow', 'family', 'celebration'],
    brand: 'Golden Rabbit',
    weight: '40g',
    safetyInstructions: [
      'Light the fuse and move away immediately',
      'Do not hold in hand',
      'Keep away from children under 8',
      'Use in open area only'
    ],
    reviews: {
      average: 4.3,
      count: 89,
      ratings: { 5: 45, 4: 30, 3: 10, 2: 3, 1: 1 }
    }
  },

  // Ground Chakkars
  {
    id: 'gc001',
    name: 'Spinning Wonder Chakkar',
    category: 'ground-chakkars',
    price: 199,
    originalPrice: 249,
    description: 'Classic ground chakkar that spins with beautiful golden sparks. Safe for home celebrations.',
    features: [
      'Spin Duration: 45-60 seconds',
      'Golden spark effect',
      'Safe for home use',
      'Sound Level: Low',
      'Premium quality'
    ],
    specifications: {
      duration: '45-60 seconds',
      colors: ['Gold'],
      noiseLevel: 'Low',
      safetyRating: 4,
      ageLimit: '5+'
    },
    images: ['/images/products/spinning-wonder-1.jpg'],
    videoUrl: '/videos/spinning-wonder-demo.mp4',
    stock: 300,
    inStock: true,
    featured: false,
    tags: ['safe', 'home', 'golden', 'spinning'],
    brand: 'Golden Rabbit',
    weight: '25g',
    safetyInstructions: [
      'Place on flat ground',
      'Light and move away 3 meters',
      'Suitable for children above 5 with supervision',
      'Use in open area'
    ],
    reviews: {
      average: 4.4,
      count: 156,
      ratings: { 5: 90, 4: 45, 3: 15, 2: 4, 1: 2 }
    }
  },

  // Flower Pots
  {
    id: 'fp001',
    name: 'Majestic Fountain',
    category: 'flower-pots',
    price: 179,
    originalPrice: 220,
    description: 'Beautiful fountain-style firework with multi-colored sparks shooting upwards like a flower blooming.',
    features: [
      'Height: 3-4 meters',
      'Duration: 30-40 seconds',
      'Multi-colored sparks',
      'Sound Level: Low',
      'Garden party perfect'
    ],
    specifications: {
      height: '3-4 meters',
      duration: '30-40 seconds',
      colors: ['Red', 'Green', 'Gold'],
      noiseLevel: 'Low',
      safetyRating: 4,
      ageLimit: '5+'
    },
    images: ['/images/products/majestic-fountain-1.jpg'],
    videoUrl: '/videos/majestic-fountain-demo.mp4',
    stock: 250,
    inStock: true,
    featured: true,
    tags: ['fountain', 'colorful', 'garden', 'family'],
    brand: 'Golden Rabbit',
    weight: '35g',
    safetyInstructions: [
      'Place on flat, stable surface',
      'Light fuse and retreat 5 meters',
      'Suitable for small gatherings',
      'Keep water nearby'
    ],
    reviews: {
      average: 4.6,
      count: 203,
      ratings: { 5: 140, 4: 45, 3: 12, 2: 4, 1: 2 }
    }
  },

  // Rockets
  {
    id: 'r001',
    name: 'Thunder Rocket',
    category: 'rockets',
    price: 399,
    originalPrice: 450,
    description: 'High-powered rocket that soars to great heights before exploding in a brilliant display of colors and sound.',
    features: [
      'Height: 80+ meters',
      'Powerful launch',
      'Loud burst effect',
      'Sound Level: High',
      'Professional grade'
    ],
    specifications: {
      height: '80+ meters',
      duration: '3-5 seconds flight + 2-3 seconds burst',
      colors: ['Red', 'White', 'Blue'],
      noiseLevel: 'High',
      safetyRating: 3,
      ageLimit: '12+'
    },
    images: ['/images/products/thunder-rocket-1.jpg'],
    videoUrl: '/videos/thunder-rocket-demo.mp4',
    stock: 100,
    inStock: true,
    featured: false,
    tags: ['powerful', 'high', 'loud', 'professional'],
    brand: 'Golden Rabbit',
    weight: '60g',
    safetyInstructions: [
      'Use launching tube or bury in ground',
      'Point away from buildings and people',
      'Adults only - Age 12+',
      'Use in large open area only'
    ],
    reviews: {
      average: 4.2,
      count: 67,
      ratings: { 5: 35, 4: 20, 3: 8, 2: 3, 1: 1 }
    }
  },

  // Sparklers
  {
    id: 'sp001',
    name: 'Golden Sparkler Pack',
    category: 'sparklers',
    price: 89,
    originalPrice: 120,
    description: 'Pack of 10 premium golden sparklers. Perfect for kids and family celebrations. Long-lasting and safe.',
    features: [
      'Pack of 10 pieces',
      'Duration: 60-90 seconds each',
      'Golden sparks',
      'Child-friendly',
      'Smokeless formula'
    ],
    specifications: {
      duration: '60-90 seconds per piece',
      colors: ['Gold'],
      noiseLevel: 'Silent',
      safetyRating: 5,
      ageLimit: '3+'
    },
    images: ['/images/products/golden-sparkler-1.jpg'],
    stock: 500,
    inStock: true,
    featured: true,
    tags: ['kids', 'safe', 'golden', 'pack', 'smokeless'],
    brand: 'Golden Rabbit',
    weight: '50g (pack)',
    safetyInstructions: [
      'Hold at arm\'s length',
      'Adult supervision for children',
      'Do not point at people',
      'Dispose safely after use'
    ],
    reviews: {
      average: 4.7,
      count: 324,
      ratings: { 5: 250, 4: 50, 3: 15, 2: 6, 1: 3 }
    }
  },

  // Gift Boxes
  {
    id: 'gb001',
    name: 'Diwali Celebration Box',
    category: 'gift-boxes',
    price: 1299,
    originalPrice: 1599,
    description: 'Complete Diwali celebration package with assorted crackers including sky shots, chakkars, sparklers, and flower pots.',
    features: [
      '25+ assorted crackers',
      'Sky shots, chakkars, sparklers',
      'Beautiful gift packaging',
      'Perfect for families',
      'Value for money'
    ],
    specifications: {
      contents: '25+ pieces',
      variety: 'Mixed assortment',
      duration: 'Complete celebration',
      noiseLevel: 'Varied',
      safetyRating: 4,
      ageLimit: '5+'
    },
    images: ['/images/products/diwali-box-1.jpg'],
    stock: 80,
    inStock: true,
    featured: true,
    tags: ['diwali', 'gift', 'assorted', 'family', 'value'],
    brand: 'Golden Rabbit',
    weight: '800g',
    includes: [
      '5x Golden Glory Sky Shots',
      '5x Spinning Wonder Chakkars',
      '3x Majestic Fountains',
      '10x Golden Sparklers',
      '2x Thunder Rockets'
    ],
    safetyInstructions: [
      'Read individual product instructions',
      'Adult supervision required',
      'Use in sequence for best effect',
      'Keep safety distance'
    ],
    reviews: {
      average: 4.8,
      count: 145,
      ratings: { 5: 115, 4: 22, 3: 5, 2: 2, 1: 1 }
    }
  },

  // Sound Crackers
  {
    id: 'sc001',
    name: 'Celebration Bomb',
    category: 'sound-crackers',
    price: 149,
    originalPrice: 180,
    description: 'Loud celebration cracker perfect for announcing festivities. Creates a powerful sound burst.',
    features: [
      'Very loud sound',
      'Instant burst',
      'Traditional design',
      'Festival essential',
      'High quality'
    ],
    specifications: {
      duration: 'Instant',
      colors: ['None - Sound only'],
      noiseLevel: 'Very High',
      safetyRating: 2,
      ageLimit: '16+'
    },
    images: ['/images/products/celebration-bomb-1.jpg'],
    stock: 200,
    inStock: true,
    featured: false,
    tags: ['loud', 'sound', 'traditional', 'festival'],
    brand: 'Golden Rabbit',
    weight: '20g',
    safetyInstructions: [
      'Light and throw immediately',
      'Never hold in hand',
      'Adults only - Age 16+',
      'Use away from populated areas',
      'Protect ears from loud sound'
    ],
    reviews: {
      average: 4.1,
      count: 98,
      ratings: { 5: 45, 4: 30, 3: 15, 2: 6, 1: 2 }
    }
  },

  // Novelty Items
  {
    id: 'n001',
    name: 'Dancing Butterfly',
    category: 'novelty',
    price: 79,
    originalPrice: 99,
    description: 'Unique novelty firework that spins and flies like a butterfly with colorful sparks.',
    features: [
      'Unique flying pattern',
      'Colorful spark trail',
      'Entertainment value',
      'Safe and fun',
      'Kids favorite'
    ],
    specifications: {
      duration: '15-20 seconds',
      colors: ['Multi-color'],
      noiseLevel: 'Low',
      safetyRating: 4,
      ageLimit: '5+'
    },
    images: ['/images/products/dancing-butterfly-1.jpg'],
    videoUrl: '/videos/dancing-butterfly-demo.mp4',
    stock: 180,
    inStock: true,
    featured: false,
    tags: ['novelty', 'fun', 'kids', 'unique', 'colorful'],
    brand: 'Golden Rabbit',
    weight: '15g',
    safetyInstructions: [
      'Light in open area',
      'Stand back 5 meters',
      'Supervision for children',
      'Unpredictable flight pattern'
    ],
    reviews: {
      average: 4.4,
      count: 76,
      ratings: { 5: 40, 4: 25, 3: 8, 2: 2, 1: 1 }
    }
  }
];

// Utility functions for products
export const getProductsByCategory = (categoryId) => {
  return sampleProducts.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = () => {
  return sampleProducts.filter(product => product.featured);
};

export const getProductById = (productId) => {
  return sampleProducts.find(product => product.id === productId);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const filterProducts = (filters) => {
  let filteredProducts = [...sampleProducts];
  
  if (filters.category) {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category);
  }
  
  if (filters.priceMin !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= filters.priceMin);
  }
  
  if (filters.priceMax !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= filters.priceMax);
  }
  
  if (filters.inStockOnly) {
    filteredProducts = filteredProducts.filter(product => product.inStock);
  }
  
  if (filters.noiseLevel) {
    filteredProducts = filteredProducts.filter(product => product.specifications.noiseLevel === filters.noiseLevel);
  }
  
  if (filters.brand) {
    filteredProducts = filteredProducts.filter(product => product.brand === filters.brand);
  }
  
  return filteredProducts;
};

export default {
  crackerCategories,
  sampleProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductById,
  searchProducts,
  filterProducts
};