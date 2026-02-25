import mongoose, { Schema, Types } from "mongoose";

/* =====================
   Order Item
===================== */
const orderItemSchema = new Schema(
  {
    id: {
      type: Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // snapshot fields (filled by backend)
    name: String,
    image: String,
    unitPrice: Number,
    totalPrice: Number,
  },
  { _id: false }
);

/* =====================
   Order Schema
===================== */
const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    deliveryAddress: {
      email: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: Number,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      thana: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },


    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
