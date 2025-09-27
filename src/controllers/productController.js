const Product = require('../models/Product');

const productController = {
  // Create a new product
  async createProduct(req, res, next) {
    try {
      const productId = await Product.create(req.body);
      const newProduct = await Product.findById(productId);
      
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      next(error);
    }
  },

  // Get product by ID
  async getProductById(req, res, next) {
    try {
      const product = await Product.findById(parseInt(req.params.id));
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  },

  // Update product
  async updateProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      
      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      const updated = await Product.update(productId, req.body);
      
      if (updated) {
        const updatedProduct = await Product.findById(productId);
        res.json({
          success: true,
          message: 'Product updated successfully',
          data: updatedProduct
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Failed to update product'
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // Delete product
  async deleteProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      
      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      const deleted = await Product.delete(productId);
      
      if (deleted) {
        res.json({
          success: true,
          message: 'Product deleted successfully'
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Failed to delete product'
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // Increase stock
  async increaseStock(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const { quantity } = req.body;

      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      const updated = await Product.increaseStock(productId, quantity);
      
      if (updated) {
        const updatedProduct = await Product.findById(productId);
        res.json({
          success: true,
          message: 'Stock increased successfully',
          data: updatedProduct
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // Decrease stock
  async decreaseStock(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const { quantity } = req.body;

      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      const updated = await Product.decreaseStock(productId, quantity);
      
      if (updated) {
        const updatedProduct = await Product.findById(productId);
        res.json({
          success: true,
          message: 'Stock decreased successfully',
          data: updatedProduct
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // Get low stock products
  async getLowStockProducts(req, res, next) {
    try {
      const lowStockProducts = await Product.getLowStock();
      
      res.json({
        success: true,
        count: lowStockProducts.length,
        data: lowStockProducts
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = productController;