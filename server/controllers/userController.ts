import { Request, Response } from "express";
import admin from "firebase-admin";
import User from "../models/userModel";
import { firebaseConfig } from "../config/firebaseConfig";

// Initialize Firebase (only if not already initialized elsewhere)
if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

const db = admin.firestore();

const saveName = async (req: Request, res: Response) => {
  const { name }: User = req.body;
  console.log("🚀 > saveName > name:", name);

  try {
    await db.collection("users").add({ name });
    res.status(200).json({ message: "Name saved successfully" });
  } catch (error) {
    console.error("Error saving name:", error);
    res.status(500).json({ error: "Failed to save name" });
  }
};

export default { saveName };
