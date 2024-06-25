import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/user", userController.saveName);

userRouter.post("/addOnePoint", userController.addPointToUser);

export default userRouter;
