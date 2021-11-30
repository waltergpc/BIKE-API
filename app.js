require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// Router
const productsRouter = require('./routes/products')

// Connect DB
const connectDB = require('./db/connect')

// Security packages
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// Error middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
  res.send('store api')
})

// Routes

app.use('/api/v1/bikes', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`App is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
