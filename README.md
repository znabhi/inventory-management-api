# Inventory Management System API 🏪📦

A robust backend API for managing inventory products with stock tracking capabilities, built for the ASE Challenge.

## Features ✨

- **Full CRUD Operations** for products  
- **Stock Management** with increase/decrease endpoints  
- **Low Stock Alerts** with customizable thresholds  
- **Input Validation** and proper error handling  
- **Security Features** including rate limiting and CORS  
- **Comprehensive Testing** with Jest and Supertest  
- **MySQL Database** integration with connection pooling  

## Tech Stack 🛠️

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MySQL  
- **Testing**: Jest + Supertest  
- **Security**: Helmet, CORS, Rate Limiting  

## Prerequisites 📋

- Node.js (v14 or higher)  
- MySQL Server (v5.7 or higher)  
- npm or yarn  

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/znabhi/inventory-management-api.git
cd inventory-management-api
```

### 2. Clone the Repository
```bash
npm install
```

### 3. Database Setup
```bash
CREATE DATABASE inventory_db;
```

### 4. Environment Configuration
Create a .env file in the root directory:
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
DB_PORT=3306

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. Initialize Database
```bash
node setup-db.js
```

### 6. Start the Application
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```
The API will be available at: http://localhost:5000

## API Endpoints

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | `/api/products`           | Get all products       |
| GET    | `/api/products/low-stock` | Get low stock products |
| GET    | `/api/products/:id`       | Get product by ID      |
| POST   | `/api/products`           | Create new product     |
| PUT    | `/api/products/:id`       | Update product         |
| DELETE | `/api/products/:id`       | Delete product         |

#### Stock Operations
| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| POST   | `/api/products/:id/increase-stock` | Increase stock quantity |
| POST   | `/api/products/:id/decrease-stock` | Decrease stock quantity |

#### Health Check
| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/api/health` | API health status |


## Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Usage Examples
#### Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro",
    "description": "Apple MacBook Pro with M3 chip",
    "stock_quantity": 25,
    "low_stock_threshold": 5
  }'
```
#### Increase Stock
```bash
curl -X POST http://localhost:5000/api/products/1/increase-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 10}'
```
#### Get Low Stock Products
```bash
curl -X GET http://localhost:5000/api/products/low-stock
```

## Project Structure
```bash 
src/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── productController.js # Business logic
├── models/
│   └── Product.js           # Data models
├── routes/
│   ├── index.js             # Main router
│   └── products.js          # Product routes
├── middleware/
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation
tests/
├── product.test.js          # Test cases
```

### Video Demonstration
##### [Watch Video](inventory-management-api-2025-09-28_12.05.12.mp4)

<video width="800" controls autoplay muted>
  <source src="inventory-management-api-2025-09-28_12.05.12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


### Postman Collection

#### Postman Collection available here: [Postman Collection Share Link](https://speeding-astronaut-270672.postman.co/workspace/My-Workspace~04cfdbc3-0d59-458b-8e31-d90f09ec1e9e/collection/35139892-b44cb5c8-bb9d-4da0-940e-ce18d9cbed7b?action=share&creator=35139892)

## Author

#### Abhishek Jain
##### Associate Software Engineer