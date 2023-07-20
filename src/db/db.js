const mongoose = require("mongoose");



mongoose.connect("mongodb://127.0.0.1:27017/dental_clinic_db").then(() => {
  console.log("Connected to mongodb");
}).catch((e) => {
  console.log("Not connected to mongodb");
})




// const mongoURI =
//   "mongodb+srv://dbuser:dbuser123@cluster0.7kq9ndl.mongodb.net/dental_clinic_db";
// console.log(mongoURI, "mongoLink*************");

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("MongoDB connection established");
// });
