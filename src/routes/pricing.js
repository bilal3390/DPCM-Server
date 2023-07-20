const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricing');

// Define routes
router.get('/', pricingController.getPrices);
router.post('/', pricingController.addPrice);

module.exports = router;
