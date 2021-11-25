require('dotenv').config()
const express = require('express')
const app = express()
const productsRouter = require('./routes/products')
const connectDB = require('./db/connect')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('store api')
})

// Routes

app.use('/api/v1/bikes', productsRouter)

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
