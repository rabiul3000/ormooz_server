import Order from "../../models/Order.js";
import Food from "../../models/Food.js";
import { io } from "../../index.js";

const createOrder = async (req, res) => {
    try {
        const { order } = req.body;
        const userId = req.user.id;

        if (!order) return res.status(404).json({ message: "Order data missing" });
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const foodIds = order.items.map(item => item.id);

        const foods = await Food.find(
            { _id: { $in: foodIds } },
            { unit_price: 1 }
        );

        let totalCost = 0;

        foods.forEach(food => {
            const item = order.items.find(
                i => i.id.toString() === food._id.toString()
            );
            totalCost += food.unit_price * item.quantity;
        });

        const newOrder = await Order.create({
            user: userId,
            items: order.items,
            totalAmount: totalCost,
            quantity: order.quantity,
            contactNumber: order.contactNumber,
            deliveryAddress: order.deliveryAddress,
        });

        const populatedOrder = await Order.findById(newOrder._id)
            .populate("user", "email contactNumber")
            .populate("items.id", "name");

        // Emit to riders (or chef depending on your system)
        io.to("rider").emit("newOrder", populatedOrder);

        return res.status(201).json({
            message: "New order created",
            order: populatedOrder,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default createOrder;
