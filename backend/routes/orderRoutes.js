const {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController')
const { protect, authorize } = require('../middleware/auth')

module.exports = (router) => {
  router.post('/orders', protect, createOrder)
  router.get('/orders', protect, getUserOrders)
  router.get('/orders/:id', protect, getOrderById)
  router.put('/orders/:id', protect, authorize('admin'), updateOrderStatus)
  router.get('/admin/orders', protect, authorize('admin'), getAllOrders)
}
