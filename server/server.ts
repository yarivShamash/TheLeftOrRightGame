import cors from "cors";
import express, { Application } from "express";
import { onRequest } from "firebase-functions/v2/https";

import { userRoutes, leaderboardRoutes } from "./routes";

import { SERVER_LOCAL_PORT } from "./consts";

const app: Application = express();
const port = SERVER_LOCAL_PORT;

const environment = process.env.NODE_ENV || "development";

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(userRoutes);
app.use(leaderboardRoutes);

export const api = onRequest(app);

if (environment === "development") {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
