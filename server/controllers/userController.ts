import { Request, Response } from "express";
import admin from "firebase-admin";
import axios from "axios";

import User from "../models/userModel";
import { firebaseConfig } from "../config/firebaseConfig";
import { convertGenderizeResponseToGender } from "./utils";

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}

const db = admin.firestore();

const saveUser = async (req: Request, res: Response) => {
  const { name }: User = req.body;

  try {
    const genderizeResponse = await axios.get(
      `https://api.genderize.io/?name=${name}`
    );
    const gender = convertGenderizeResponseToGender(genderizeResponse.data);

    const randomuserResponse = await axios.get(
      `https://randomuser.me/api/?gender=${gender}&name=${name}`
    );

    const { email, location, phone, cell, nat, picture } = JSON.parse(
      JSON.stringify(randomuserResponse.data)
    ).results[0];

    const userResponse = await db.collection("users").add({
      name,
      gender,
      email,
      location,
      phone,
      cell,
      nat,
      picture,
      points: 0,
    });

    const userDoc = await userResponse.get();

    const userData = userDoc.data();

    res.status(200).json({ user: { ...userData, id: userDoc.id } });
  } catch (error) {
    console.error("Error saving name:", error);
    res.status(500).json({ error: "Failed to save name" });
  }
};

const addPointToUser = async (req: Request, res: Response) => {
  const { id }: User = req.body;

  try {
    await db
      .collection("users")
      .doc(id)
      .update({
        points: admin.firestore.FieldValue.increment(1),
      });
    res.status(200).json({ message: "One point added to user" });
  } catch (error) {
    console.error("Error adding one point to user:", error);
    res.status(500).json({ error: "Failed to add one point to user" });
  }
};

export default { saveName: saveUser, addPointToUser };
