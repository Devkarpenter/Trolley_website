const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })

// Routes
const router = express.Router()
require('./routes/authRoutes')(router)
require('./routes/productRoutes')(router)
require('./routes/orderRoutes')(router)
require("./routes/paymentRoutes")(router);
require('./routes/cartRoutes')(router)


app.use('/api', router)

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' })
})

// Error Handler Middleware
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
