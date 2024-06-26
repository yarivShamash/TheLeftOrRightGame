import express from "express";
import { getLeaderboard } from "../controllers";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/leaderboard", getLeaderboard);

export default leaderboardRouter;
