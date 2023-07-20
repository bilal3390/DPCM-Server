const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["patient", "clinic", "other"],
    required: true,
  },
  // Additional expense-related fields can be added here
});

const entrySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    expense: expenseSchema,
    profit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FinanceEntry = mongoose.model("FinanceEntry", entrySchema);

module.exports = FinanceEntry;
