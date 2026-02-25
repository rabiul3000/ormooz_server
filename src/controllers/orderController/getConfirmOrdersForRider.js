import Order from "../../models/Order.js";



const getConfirmOrdersForRider = async (req, res) => {
    const orders = await Order.find({ orderStatus: "confirmed" }).populate("user", "email contactNumber").populate("items.id", "name").sort({ createdAt: -1 });
    if (!orders) return res.status(404).json({ message: "No orders found" })

    return res.status(200).json(orders);

}

export default getConfirmOrdersForRider;