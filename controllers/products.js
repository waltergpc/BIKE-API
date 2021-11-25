const Bike = require('../models/bike')

const getAllBikes = async (req, res) => {
  const Bikes = await Bike.find({})
  res.status(200).json({ Bikes })
}

module.exports = { getAllBikes }
