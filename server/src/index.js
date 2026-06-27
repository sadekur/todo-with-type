const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const todoRoutes = require('./routes/todos')

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
