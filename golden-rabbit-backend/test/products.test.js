const request = require('supertest');
const app = require('../src/index');

describe('Products API', () => {
  test('GET /api/products returns products array', async () => {
    const res = await request(app).get('/api/products').expect(200);
    expect(res.body).toHaveProperty('products');
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBeGreaterThanOrEqual(0);
    if (res.body.products.length > 0) {
      const p = res.body.products[0];
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
    }
  });

  test('GET /api/products/:id returns product or 404', async () => {
    const list = await request(app).get('/api/products').expect(200);
    if (list.body.products.length === 0) {
      // no products available; skip detailed check
      return;
    }
    const id = list.body.products[0].id;
    const res = await request(app).get(`/api/products/${id}`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('product');
      expect(res.body.product.id).toBeDefined();
    }
  });

  test('GET /api/products/:id returns 404 for non-existent id', async () => {
    const nonExistId = 9999999;
    const res = await request(app).get(`/api/products/${nonExistId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
