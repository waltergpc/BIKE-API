const mongoose = require('mongoose')

const BikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    images: {
      type: Array,
    },
  },
  { timeStamps: true }
)

module.exports = mongoose.model('Bike', BikeSchema)
