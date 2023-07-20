const Pricing = require('../models/pricing');

// GET all prices
exports.getPrices = async (req, res) => {
  try {
    const prices = await Pricing.find();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
};

// POST new price
exports.addPrice = async (req, res) => {
  const { patientId, totalAmount, paidAmount, service } = req.body;
  
  try {
    const remainingAmount = totalAmount - paidAmount;

    const newPrice = await Pricing.create({
      patientId,
      totalAmount,
      paidAmount,
      remainingAmount,
      service,
    });

    res.status(201).json(newPrice);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add price' });
  }
};
