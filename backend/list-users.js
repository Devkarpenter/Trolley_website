require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

async function run(){
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to mongo')
    const users = await User.find().limit(20).lean()
    console.log('users count:', users.length)
    console.log(JSON.stringify(users, null, 2))
    await mongoose.disconnect()
  }catch(err){
    console.error('err', err)
    process.exit(1)
  }
}
run()
