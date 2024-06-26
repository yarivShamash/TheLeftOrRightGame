import axios from "axios";
import { SERVER_LOCAL_PORT } from "./consts";

const isDevMode = process.env.NODE_ENV === "development";

const api = axios.create({
  baseURL: isDevMode
    ? `http://localhost:${SERVER_LOCAL_PORT}`
    : "https://the-left-or-right-game.web.app/api",
});

export default api;
