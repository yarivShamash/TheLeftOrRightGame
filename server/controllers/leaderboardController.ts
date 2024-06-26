import { Request, Response } from "express";
import admin from "firebase-admin";

import { firebaseConfig } from "../config/firebaseConfig";

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

const db = admin.firestore();

const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const usersResponse = await db.collection("users");
    const leaderboardResponse = await db.collection("leaderboard");

    const userDoc = await usersResponse.get();

    const usersByPoints = userDoc.docs.sort((userA, userB) => {
      return userB.data().points - userA.data().points;
    });

    const leaderboard = usersByPoints.map((userSnapshot, i) => {
      const { name, points } = userSnapshot.data();

      const userRank = { name, score: points, rank: i + 1 };
      leaderboardResponse.add(userRank);
      return userRank;
    });

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error saving name:", error);
    res.status(500).json({ error: "Failed to save name" });
  }
};

export default { getLeaderboard };
