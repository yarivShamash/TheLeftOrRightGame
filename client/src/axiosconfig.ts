import axios from "axios";
import { SERVER_LOCAL_PORT } from "./consts";

const pageUrl = window.location.href;
const isLocalEnv = pageUrl.includes("localhost");

const api = axios.create({
  baseURL: isLocalEnv
    ? `http://localhost:${SERVER_LOCAL_PORT}`
    : `${pageUrl}/api`,
});

export default api;
