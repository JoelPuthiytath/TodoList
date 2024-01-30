import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoute from "./routes/todoRoute.js";

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const mongodb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected ${mongodb.connection.host}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/todo", todoRoute);

app.listen(port, () => console.log("server listening on port " + port));
