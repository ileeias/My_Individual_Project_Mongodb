// import express from "express";
// import dotenv from 'dotenv';
// import mongoose from "mongoose";
// import userRoutes from "./routes/user.routes.js";
// import albumRoutes from "./routes/album.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import photoRoutes from "./routes/photo.routes.js";
// import videoRoutes from "./routes/video.routes.js";
// import { MongoClient } from "mongodb";




// // dotenv.config();
// const app = express();
// const PORT = 8000;
// const connectionString = "mongodb://127.0.0.1:27017/project1";
// const client = new MongoClient(connectionString);
// // const PORT = process.env.PORT;
// // const connectionString = process.env.CONNECTION_STRING;

// async function connectDatabase() {
//     try {
//         await mongoose.connect(connectionString);
//         console.log("Подключенно к базе данных!");
//     } catch (error) {
//         console.log("Error!");
//     }
// }

// app.use(express.json());

// app.use("/auth", authRoutes);
// app.use("/photo", photoRoutes);
// app.use("/video", videoRoutes);
// app.use("/user", userRoutes);
// app.use("/album", albumRoutes)



// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// });
    
// app.listen(PORT, async () => {
//     await connectDatabase();
//     console.log(`Сервер запущен на localhost://${PORT}`);
// });

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