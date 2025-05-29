import mongoose from "mongoose";

// Define your MongoDB URI
const uri = "mongodb+srv://sarah:2Q4p8PhAjvg9Pkl3@vat.glpccbq.mongodb.net//vat?retryWrites=true&w=majority&appName=VAT"

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri); 
    console.log(' MongoDB connected');
  } catch (err) {
    console.error(' DB connection failed:', err);
    process.exit(1);
  }
};
 

export default connectDB;