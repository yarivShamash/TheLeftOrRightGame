/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { userRoutes, leaderboardRoutes } from "../../server/routes/";
import { firebaseConfig } from "../../server/config/firebaseConfig";
import admin from "firebase-admin";

const app: express.Application = express();

admin.initializeApp(firebaseConfig);

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(leaderboardRoutes);

export const api = onRequest(app);
