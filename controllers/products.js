const Bike = require('../models/bike')
const { NotFoundError } = require('../errors')

const getAllBikes = async (req, res) => {
  const Bikes = await Bike.find(
    {},
    {
      name: 1,
      brand: 1,
      price: 1,
      image: 1,
      description: 1,
      category: 1,
      _id: 1,
      mountain: 1,
      hardtail: 1,
      featured: 1,
      size: 1,
      shipping: 1,
    }
  )

  res.status(200).json([...Bikes])
}

const getSingleBike = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const bike = await Bike.findOne({ _id: id }).lean()
  bike.stars = parseFloat(bike.stars)

  if (!bike) {
    throw new NotFoundError('item not found')
  }

  res.status(200).json(bike)
}

module.exports = { getAllBikes, getSingleBike }
