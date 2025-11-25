const { signup, signin, logout, getProfile, updateProfile } = require('../controllers/authController')
const { protect } = require('../middleware/auth')

module.exports = (router) => {
  router.post('/auth/signup', signup)
  router.post('/auth/signin', signin)
  router.post('/auth/logout', logout)
  router.get('/auth/profile', protect, getProfile)
  router.put('/auth/profile', protect, updateProfile)
}
