import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Подключение к базе данных установлено!");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error.message);
  }
};