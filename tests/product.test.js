const request = require('supertest');
const app = require('../server');
const { pool } = require('../src/config/database');

describe('Inventory Management API', () => {
  let productId;

  beforeAll(async () => {
    // Clear products table before tests
    await pool.execute('DELETE FROM products');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100,
        low_stock_threshold: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(productData.name);
      expect(response.body.data.stock_quantity).toBe(productData.stock_quantity);
      
      productId = response.body.data.id;
    });

    it('should return 400 for invalid product data', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ name: '' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get product by ID', async () => {
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(productId);
    });

    it('should return 404 for non-existent product', async () => {
      await request(app)
        .get('/api/products/9999')
        .expect(404);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product', async () => {
      const updateData = {
        name: 'Updated Product',
        description: 'Updated Description',
        stock_quantity: 150
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });

    it('should prevent negative stock quantity', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send({ stock_quantity: -10 })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Stock Operations', () => {
    it('should increase stock quantity', async () => {
      const response = await request(app)
        .post(`/api/products/${productId}/increase-stock`)
        .send({ quantity: 50 })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should decrease stock quantity', async () => {
      const response = await request(app)
        .post(`/api/products/${productId}/decrease-stock`)
        .send({ quantity: 30 })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should prevent decreasing stock below zero', async () => {
      const response = await request(app)
        .post(`/api/products/${productId}/decrease-stock`)
        .send({ quantity: 1000 })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/products/low-stock', () => {
    it('should get low stock products', async () => {
      // Create a low stock product
      await request(app)
        .post('/api/products')
        .send({
          name: 'Low Stock Product',
          description: 'This product has low stock',
          stock_quantity: 5,
          low_stock_threshold: 10
        });

      const response = await request(app)
        .get('/api/products/low-stock')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product', async () => {
      await request(app)
        .delete(`/api/products/${productId}`)
        .expect(200);
    });
  });
});