import axios from "axios";
import { SERVER_LOCAL_PORT } from "./consts";

// const isDevMode = process.env.NODE_ENV === "development";
const firebaseHostingUrl = process.env.FIREBASE_HOSTING_URL;
console.log(
  "🚀 > process.env.FIREBASE_HOSTING_URL:",
  process.env.FIREBASE_HOSTING_URL,
  process.env
);

const api = axios.create({
  baseURL: firebaseHostingUrl
    ? firebaseHostingUrl + "/api"
    : `http://localhost:${SERVER_LOCAL_PORT}`,
});

export default api;
