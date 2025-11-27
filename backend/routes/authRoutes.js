const { 
  signup, 
  signin, 
  logout, 
  getProfile, 
  updateProfile, 
  googleLogin     // ⭐ New
} = require('../controllers/authController')

const { protect } = require('../middleware/auth')

module.exports = (router) => {
  router.post('/auth/signup', signup)
  router.post('/auth/signin', signin)
  router.post('/auth/logout', logout)

  // ⭐ NEW GOOGLE LOGIN ROUTE
  router.post('/auth/google', googleLogin)

  router.get('/auth/profile', protect, getProfile)
  router.put('/auth/profile', protect, updateProfile)
}
