# Trolley Store Backend API

Backend API for the Trolley Store ecommerce platform built with Express.js and MongoDB.

## Features

- **User Authentication**: Signup, signin, logout with JWT tokens
- **Product Management**: CRUD operations for products with categories
- **Order Management**: Create and track orders with payment and shipping status
- **Role-Based Access**: Admin and user roles with authorization
- **Error Handling**: Centralized error handling middleware
- **CORS Enabled**: Configured for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB credentials and JWT secret:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your actual values

## Environment Variables

Create a `.env` file in the backend root directory with:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/trolley-store
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Getting MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with username and password
4. Get the connection string
5. Replace `username` and `password` with your credentials
6. Update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=TravelTrolleys` - Filter by category
- `GET /api/products?featured=true` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id` - Update order status (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

## Database Models

### User Schema
```
- name (String)
- email (String, unique)
- password (String, hashed)
- phone (String)
- address (Object)
- role (String: 'user' or 'admin')
- isActive (Boolean)
- timestamps
```

### Product Schema
```
- name (String)
- description (String)
- price (Number)
- category (String)
- stock (Number)
- rating (Number)
- reviews (Number)
- image (String)
- featured (Boolean)
- timestamps
```

### Order Schema
```
- userId (ObjectId reference)
- items (Array of products)
- shippingAddress (Object)
- subtotal (Number)
- tax (Number)
- shippingCost (Number)
- totalPrice (Number)
- paymentMethod (String)
- paymentStatus (String)
- orderStatus (String)
- trackingNumber (String)
- timestamps
```

### Cart Schema
```
- userId (ObjectId reference)
- items (Array of products)
- totalPrice (Number)
- timestamps
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in request headers:

```
Authorization: Bearer <your_token_here>
```

### Signup Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Signin Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Response Format

All responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": {}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Folder Structure

```
backend/
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── server.js
├── package.json
├── .env
└── .env.example
```

## Development

### Adding New Routes

1. Create a controller file in `controllers/` directory
2. Create route file in `routes/` directory
3. Import and register route in `server.js`

### Example:

```javascript
// controllers/exampleController.js
exports.getExample = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// routes/exampleRoutes.js
const { getExample } = require('../controllers/exampleController')
module.exports = (router) => {
  router.get('/example', getExample)
}

// server.js
require('./routes/exampleRoutes')(router)
```

## Troubleshooting

### MongoDB Connection Error
- Check MONGODB_URI in `.env`
- Ensure IP whitelist on MongoDB Atlas includes your IP
- Verify username and password

### JWT Errors
- Ensure JWT_SECRET is set in `.env`
- Check token format in Authorization header
- Token may have expired (default 7 days)

### CORS Errors
- Update CORS configuration in `server.js` if needed
- Ensure FRONTEND_URL matches your frontend URL

## License

ISC

## Support

For issues or questions, contact the development team.
