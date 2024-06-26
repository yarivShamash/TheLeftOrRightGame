import express from "express";
import { saveUser, addPointToUser } from "../controllers";

const userRouter = express.Router();

userRouter.post("/user", saveUser);

userRouter.post("/addOnePoint", addPointToUser);

export default userRouter;
