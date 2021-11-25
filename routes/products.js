const express = require('express')
const router = express.Router()
const { getAllBikes } = require('../controllers/products')

router.route('/').get(getAllBikes)

module.exports = router
