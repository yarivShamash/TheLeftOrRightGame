import cors from "cors";
import express, { Application, Request, Response } from "express";

import { userRoutes, leaderboardRoutes } from "./routes";

import { SERVER_LOCAL_PORT } from "./consts";

const app: Application = express();
const port = SERVER_LOCAL_PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(userRoutes);
app.use(leaderboardRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express & TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
