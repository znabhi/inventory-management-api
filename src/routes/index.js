const express = require('express');
const router = express.Router();
const productsRouter = require('./products');

// API routes
router.use('/products', productsRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Inventory Management API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;