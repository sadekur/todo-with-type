const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://soikut:soikut@cluster0.tauyza2.mongodb.net/todo-app'

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(MONGODB_URI)
}

module.exports = { connectDB }
