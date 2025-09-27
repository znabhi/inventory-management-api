const { pool } = require('../config/database');

class Product {
  // Create a new product
  static async create(productData) {
    const { name, description, stock_quantity = 0, low_stock_threshold = 10 } = productData;
    
    const query = `
      INSERT INTO products (name, description, stock_quantity, low_stock_threshold) 
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute(query, [name, description, stock_quantity, low_stock_threshold]);
    return result.insertId;
  }

  // Get all products
  static async findAll() {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  // Get product by ID
  static async findById(id) {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Update product
  static async update(id, updateData) {
    const { name, description, stock_quantity, low_stock_threshold } = updateData;
    
    // Prevent stock quantity from going below zero
    if (stock_quantity !== undefined && stock_quantity < 0) {
      throw new Error('Stock quantity cannot be negative');
    }

    const query = `
      UPDATE products 
      SET name = ?, description = ?, stock_quantity = ?, low_stock_threshold = ? 
      WHERE id = ?
    `;
    
    const [result] = await pool.execute(query, [
      name, description, stock_quantity, low_stock_threshold, id
    ]);
    
    return result.affectedRows > 0;
  }

  // Delete product
  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }

  // Increase stock quantity
  static async increaseStock(id, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const query = 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?';
    const [result] = await pool.execute(query, [quantity, id]);
    
    return result.affectedRows > 0;
  }

  // Decrease stock quantity
  static async decreaseStock(id, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    // Check if sufficient stock is available
    const product = await this.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock_quantity < quantity) {
      throw new Error('Insufficient stock available');
    }

    const query = 'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?';
    const [result] = await pool.execute(query, [quantity, id]);
    
    return result.affectedRows > 0;
  }

  // Get low stock products
  static async getLowStock() {
    const query = 'SELECT * FROM products WHERE stock_quantity <= low_stock_threshold ORDER BY stock_quantity ASC';
    const [rows] = await pool.execute(query);
    return rows;
  }
}

module.exports = Product;