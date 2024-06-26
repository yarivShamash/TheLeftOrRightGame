import axios from "axios";
import { SERVER_LOCAL_PORT } from "./consts";

// const isDevMode = process.env.NODE_ENV === "development";
const firebaseHostingUrl = process.env.FIREBASE_HOSTING_URL;

const api = axios.create({
  baseURL: firebaseHostingUrl
    ? firebaseHostingUrl + "/api"
    : `http://localhost:${SERVER_LOCAL_PORT}`,
});
// baseURL: isDevMode
//   ? `http://localhost:${SERVER_LOCAL_PORT}`
//   : "the-left-or-right-game--pr5-firebase-hosting-0suikrc0.web.app/api",

export default api;
