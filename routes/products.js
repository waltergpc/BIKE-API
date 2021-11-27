const express = require('express')
const router = express.Router()
const { getAllBikes, getSingleBike } = require('../controllers/products')

router.route('/').get(getAllBikes)

router.route('/:id').get(getSingleBike)

module.exports = router
