import { Router } from "express";
import getAllFoodItems from "../controllers/foodController/getAllFoodItems.js";
import getFoodItem from "../controllers/foodController/getFoodItem.js";
import updateFoodItem from "../controllers/foodController/updateFoodItem.js";
import verifyAdmin from "../middlewares/authMiddleWare/verifyAdmin.js";
import verifyJWT from "../middlewares/authMiddleWare/verifyJWT.js";

const foodsRouts = Router();

foodsRouts.get("/all", getAllFoodItems);
foodsRouts.get("/:id", getFoodItem);
foodsRouts.put("/update", verifyJWT, verifyAdmin, updateFoodItem);
// foodsRouts.post("/foods/new", createFoodItem);
// foodsRouts.patch("/foods/:id", updateFoodItem);
// foodsRouts.delete("/foods/:id", deleteFoodItem);

export default foodsRouts;
