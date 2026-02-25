import { Router } from "express";
import authRoutes from "./authRoutes.js";
import foodsRouts from "./foodsRouts.js";
import orderRoutes from "./orderRoutes.js";
import notificationRoutes from "./notificationRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/foods", foodsRouts);
router.use("/orders", orderRoutes);
router.use("/notifications", notificationRoutes);


export default router;
