const validateProduct = (req, res, next) => {
  const { name, stock_quantity, low_stock_threshold } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Product name is required'
    });
  }

  if (stock_quantity !== undefined && (isNaN(stock_quantity) || stock_quantity < 0)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Stock quantity must be a non-negative number'
    });
  }

  if (low_stock_threshold !== undefined && (isNaN(low_stock_threshold) || low_stock_threshold < 0)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Low stock threshold must be a non-negative number'
    });
  }

  next();
};

const validateStockOperation = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Quantity must be a positive number'
    });
  }

  next();
};

module.exports = { validateProduct, validateStockOperation };