import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    contactNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "foodie", "admin"],
        default: "user"
    },
    image: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;