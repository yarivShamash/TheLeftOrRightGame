import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/user", userController.saveName);

router.post("/addOnePoint", userController.addPointToUser);

export default router;
