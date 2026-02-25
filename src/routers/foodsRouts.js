import { Router } from "express";
import getAllFoodItems from "../controllers/foodController/getAllFoodItems.js";
import getFoodItem from "../controllers/foodController/getFoodItem.js";

const foodsRouts = Router();

foodsRouts.get("/all", getAllFoodItems);
foodsRouts.get("/:_id", getFoodItem);
// foodsRouts.post("/foods/new", createFoodItem);
// foodsRouts.patch("/foods/:id", updateFoodItem);
// foodsRouts.delete("/foods/:id", deleteFoodItem);

export default foodsRouts;
