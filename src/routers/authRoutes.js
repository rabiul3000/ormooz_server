import { Router } from "express";
import registerUser from "../controllers/authController/registerUser.js";
import loginUser from "../controllers/authController/loginUser.js";
import logoutUser from "../controllers/authController/logoutUser.js";
import getCurrentUser from "../controllers/authController/getCurrentUser.js";
import updateUserProfile from "../controllers/authController/updateUserProfile.js";
import verifyJWT from "../middlewares/authMiddleWare/verifyJWT.js";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);


authRoutes.get("/me", verifyJWT, getCurrentUser);
authRoutes.patch("/update-profile", updateUserProfile);
authRoutes.post("/logout", logoutUser);

export default authRoutes;
