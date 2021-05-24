import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.MONGOURI.toString();

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB conectada...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
