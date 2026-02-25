import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URL;

        if (!mongoUri) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");
    } catch (error) {      
        console.error("MongoDB error=====>", error);
        process.exit(1);
    }
};

export default connectDB;
