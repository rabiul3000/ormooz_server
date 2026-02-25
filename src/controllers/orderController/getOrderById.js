import Order from "../../models/Order.js";


const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user.id;
    const order = await Order.findById(orderId).populate("items.id", "name image unit_price");




    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }



    return res.status(200).json(order);

}

export default getOrderById;    