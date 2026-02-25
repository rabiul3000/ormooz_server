import { io } from "../../index.js";
import Notification from "../../models/Notification.js";
import Order from "../../models/Order.js";
import sendPushNotification from "../../utils/sendPushNotification.js"


const updateOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderStatus = req.body.orderStatus;

        const allStatus = ["pending", "confirmed", "delivered"];

        const order = await Order.findById(orderId).populate("user");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Validate status
        if (!allStatus.includes(orderStatus)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        // Status progression logic
        if (orderStatus === "pending") {
            order.orderStatus = "confirmed";
            await Notification.create({
                from: req.user.id,
                to: order.user._id,
                orderId: order._id,
                type: "ORDER_CONFIRMED",
                message: "Your order has been confirmed",

            })

            // socket notification
            io.to(order.user._id.toString()).emit("newNotification", {
                from: req.user.id,
                to: order.user._id,
                message: "Your order has been confirmed",
                orderId: order._id,
                type: "ORDER_CONFIRMED",
                createdAt: new Date(),
            });

            // push notification with one signal
            await sendPushNotification({
                externalUserId: order.user._id.toString(),
                title: "ORDER_CONFIRMED",
                message: "Your order has been confirmed",
                url: `${process.env.CLIENT_URL}/orders/${order._id}`,
            });


        }

        else if (orderStatus === "confirmed") {
            order.orderStatus = "delivered";
            await Notification.create({
                from: req.user.id,
                to: order.user._id,
                message: "Your order has been delivered",
                orderId: order._id,
                type: "ORDER_DELIVERED",
            })

            io.to(order.user._id.toString()).emit("newNotification", {
                from: req.user.id,
                to: order.user._id,
                message: "Your order has been delivered",
                orderId: order._id,
                type: "ORDER_DELIVERED",
                createdAt: new Date(),
            });

            // push notification with one signal
            await sendPushNotification({
                externalUserId: order.user._id.toString(),
                title: "ORDER_DELIVERED",
                message: "Your order has been Deleivered",
                url: `${process.env.CLIENT_URL}/orders/${order._id}`,
            });


        }
        else {
            return res.status(400).json({ message: "Update not allowed" });
        }

        await order.save();

        return res.status(200).json(order);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

export default updateOrderById;
