require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const productsRouter = require('./routes/products')
const connectDB = require('./db/connect')
const cors = require('cors')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send('store api')
})

// Routes

app.use('/api/v1/bikes', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = 5000

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
