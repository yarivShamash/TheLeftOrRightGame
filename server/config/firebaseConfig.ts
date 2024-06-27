import dotenv from "dotenv";
import admin from "firebase-admin";

import { ServiceAccount, credential } from "firebase-admin";

dotenv.config({ path: ".env.local" });
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS || "{}");

export const firebaseConfig = {
  credential: credential.cert(serviceAccount as ServiceAccount),
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
}
