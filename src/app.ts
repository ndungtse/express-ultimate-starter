import express from "express";
import dotEnv from "dotenv";
import cors from "cors";

dotEnv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
