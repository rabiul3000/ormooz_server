import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },

    type: {
        type: String,
        enum: [
            "ORDER_CONFIRMED",
            "ORDER_DELIVERED",
            "ORDER_NEW",
            "ORDER_CANCELLED"
        ],
        required: true,
    },

    message: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true });

const Notification = mongoose.model("Notification", userSchema);

export default Notification;