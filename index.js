import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import albumRoutes from "./routes/album.routes.js";
import authRoutes from "./routes/auth.routes.js";
import photoRoutes from "./routes/photo.routes.js";
import videoRoutes from "./routes/video.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const connectionString = process.env.CONNECTION_STRING;

import cors from "cors";
app.use(cors());


connectDatabase();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/photo", photoRoutes);
app.use("/video", videoRoutes);
app.use("/user", userRoutes);
app.use("/album", albumRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});