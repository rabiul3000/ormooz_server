import { Router } from "express";
import getAllNotificationsByUserId from "../controllers/notificationController/getAllNotificationsByUserId.js";
import verifyJWT from "../middlewares/authMiddleWare/verifyJWT.js";
import markAsReadByUser from "../controllers/notificationController/markAsReadByUser.js";
import deleteNotificationById from "../controllers/notificationController/deleteNotificationById.js";

const notificationRoutes = Router();

notificationRoutes.get("/:status", verifyJWT, getAllNotificationsByUserId);
notificationRoutes.patch("/mark-as-read", verifyJWT, markAsReadByUser);
notificationRoutes.delete("/delete/:id", verifyJWT, deleteNotificationById);


export default notificationRoutes;