const mongoose = require("mongoose");
const DentalChart = new mongoose.Schema({
  patientid: {
    type: String,
  },
  dentalChart: {
    type: Array,
  },
  
});

const DentalCharts = mongoose.model("DentalCharts", DentalChart);

module.exports = DentalCharts;
