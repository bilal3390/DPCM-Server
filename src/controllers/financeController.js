const FinanceEntry = require("../models/adminFinance");

// Controller for adding a finance entry
exports.addFinanceEntry = async (req, res) => {
  try {
    console.log(req.body);
    const { adminId, expenseAmount, expenseType, profitAmount, description } =
      req.body;

    // Create a new finance entry
    const financeEntry = await FinanceEntry.create({
      admin: adminId,
      expense: { amount: expenseAmount, type: expenseType },
      profit: profitAmount,
      description: description,
    });

    // Save the finance entry to the database
    // await financeEntry.save();

    res.status(201).json({ success: true, data: financeEntry });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add finance entry",
      error: error.message,
    });
  }
};

exports.getAllFinanceEntries = async (req, res) => {
  try {
    // Retrieve all finance entries from the database
    const financeEntries = await FinanceEntry.find().populate("admin");

    res.status(200).json({
      success: true,
      results: financeEntries.length,
      data: financeEntries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve finance entries",
      error: error.message,
    });
  }
};
