import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import { getApp } from "./controllers/app.controller";

dotEnv.config();

const app = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());

app.get("/", getApp);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
