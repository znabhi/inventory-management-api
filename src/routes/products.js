const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct, validateStockOperation } = require('../middleware/validation');

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// GET /api/products/low-stock - Get low stock products
router.get('/low-stock', productController.getLowStockProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', productController.getProductById);

// POST /api/products - Create new product
router.post('/', validateProduct, productController.createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', validateProduct, productController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

// POST /api/products/:id/increase-stock - Increase stock
router.post('/:id/increase-stock', validateStockOperation, productController.increaseStock);

// POST /api/products/:id/decrease-stock - Decrease stock
router.post('/:id/decrease-stock', validateStockOperation, productController.decreaseStock);

module.exports = router;