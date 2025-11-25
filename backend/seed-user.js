require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User')

async function run(){
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to mongo')
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash('Password123', salt)
    const user = await User.create({ name: 'Seed User', email: 'seed.user@example.com', password: hashed })
    console.log('created user', user._id)
    await mongoose.disconnect()
  }catch(err){
    console.error('err', err)
    process.exit(1)
  }
}
run()
