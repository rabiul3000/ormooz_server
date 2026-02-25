import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleWare/verifyJWT.js";
import createOrder from "../controllers/orderController/createOrder.js";
import getOrderById from "../controllers/orderController/getOrderById.js";
import updateOrderById from "../controllers/orderController/updateOrderById.js";
import deleteOrderById from "../controllers/orderController/deleteOrderById.js";
import getAllOrdersByUserId from "../controllers/orderController/getAllOrdersByUserId.js";
import verifyRiderOrAdmin from "../middlewares/authMiddleWare/verifyRiderOrAdmin.js";
import getAllOrders from "../controllers/orderController/getAllOrders.js";
import getPendingOrders from "../controllers/orderController/getPendingOrders.js";
import getConfirmOrders from "../controllers/orderController/getConfirmOrders.js";
import getDeliveredOrders from "../controllers/orderController/getDeliveredOrders.js";

const orderRoutes = Router();

orderRoutes.post("/new", verifyJWT, createOrder);
orderRoutes.get("/all_orders_for_user/", verifyJWT, getAllOrdersByUserId);
orderRoutes.get("/all_orders", verifyJWT, verifyRiderOrAdmin, getAllOrders);
orderRoutes.get("/pending_orders", verifyJWT, verifyRiderOrAdmin, getPendingOrders);
orderRoutes.get("/confirm_orders", verifyJWT, verifyRiderOrAdmin, getConfirmOrders);
orderRoutes.get("/delivered_orders", verifyJWT, verifyRiderOrAdmin, getDeliveredOrders);
orderRoutes.get("/order_detail/:id", verifyJWT, getOrderById);
orderRoutes.patch("/update/:id", verifyJWT, verifyRiderOrAdmin, updateOrderById);
orderRoutes.delete("/orders/:id", verifyJWT, deleteOrderById);

export default orderRoutes;