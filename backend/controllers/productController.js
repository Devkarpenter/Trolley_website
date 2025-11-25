const Product = require('../models/Product')

exports.getAllProducts = async (req, res) => {
  try {
    const { category, featured } = req.query
    let query = {}

    if (category) {
      query.category = category
    }
    if (featured === 'true') {
      query.featured = true
    }

    const products = await Product.find(query)
    res.status(200).json({ success: true, count: products.length, products })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' })
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      image: image || '🛒',
    })

    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category')
    res.status(200).json({ success: true, categories })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
