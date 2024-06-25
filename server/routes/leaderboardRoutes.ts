import express from "express";
import leaderboardController from "../controllers/leaderboardController";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/leaderboard", leaderboardController.getLeaderboard);

export default leaderboardRouter;
