const Order = require('../models/Order')

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, tax, shippingCost, paymentMethod } = req.body

    if (!items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' })
    }

    const totalPrice = subtotal + tax + shippingCost

    const order = await Order.create({
      userId: req.user.id,
      items,
      shippingAddress,
      subtotal,
      tax,
      shippingCost: shippingCost || 0,
      totalPrice,
      paymentMethod: paymentMethod || 'credit-card',
    })

    res.status(201).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId', 'name price')
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this order' })
    }

    res.status(200).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: orders.length, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true, runValidators: true }
    )

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    res.status(200).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: orders.length, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
