import express, { Express, Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.routes";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/auth", userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
