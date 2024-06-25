import axios from "axios";
import { SERVER_LOCAL_PORT } from "./consts";

const api = axios.create({
  baseURL: `http://localhost:${SERVER_LOCAL_PORT}`,
});

export default api;
