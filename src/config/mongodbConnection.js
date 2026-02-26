import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodbConnection = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log(process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB error=====>", error);
        process.exit(1);
    }
};

export default mongodbConnection;
