const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  await mongoose.connect("mongodb+srv://manish:Manish12345@cluster0.5wmrisd.mongodb.net/aura_campus_connect?retryWrites=true&w=majority&appName=Cluster0");
};

module.exports = connectDB;
