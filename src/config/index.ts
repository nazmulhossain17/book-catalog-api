import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const secretConfig = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
};
