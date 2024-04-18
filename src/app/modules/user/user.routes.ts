import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", userController.createUser);
router.post("/auth/signin", userController.loginUser);
router.get("/auth/log-out", userController.logoutUser);

router.get("/users", userController.getAllUser);
router.get("/users/:id", userController.getSingleUser);
router.patch("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export const userRoutes = router;
