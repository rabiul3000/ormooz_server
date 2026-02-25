import { Router } from "express";

const cartsRouts = Router();

cartsRouts.post("/new", registerUser);
cartsRouts.get("/carts/:id", getCart);
cartsRouts.patch("/update/:id", updateCart);
cartsRouts.delete("/carts/:id", deleteCart);

export default cartsRouts;
