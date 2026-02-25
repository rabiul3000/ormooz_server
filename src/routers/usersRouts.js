import { Router } from "express";

const usersRoute = Router();

usersRoute.get("/users", getAllUsers);
usersRoute.get("/users/:id", getUser);
usersRoute.patch("/users/:id/role", updateUserRole);
usersRoute.patch("/users/:id/status", updateUserStatus);
usersRoute.delete("/users/:id", deleteUser);

export default usersRoute;
