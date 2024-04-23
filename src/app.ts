import express, { Express, Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.routes";
import { categoryRoutes } from "./app/modules/category/category.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { bookRoutes } from "./app/modules/book/book.routes";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/books", bookRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
