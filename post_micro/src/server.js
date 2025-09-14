import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.js";
import config from "./config/index.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(config.port, () =>
  console.log(`post_micro running at http://localhost:${config.port}/api`)
);
