const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Database errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      error: 'Duplicate entry',
      message: 'A product with this name already exists'
    });
  }

  // Custom business logic errors
  if (err.message.includes('Stock quantity cannot be negative') || 
      err.message.includes('Insufficient stock available') ||
      err.message.includes('Quantity must be positive')) {
    return res.status(400).json({
      error: 'Bad Request',
      message: err.message
    });
  }

  // Product not found
  if (err.message.includes('Product not found')) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
};

module.exports = errorHandler;