import Order from "../../models/Order.js";

const getAllOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId }).select("_id createdAt orderStatus paymentStatus totalAmount items").sort({ createdAt: -1 });


        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default getAllOrdersByUserId;
