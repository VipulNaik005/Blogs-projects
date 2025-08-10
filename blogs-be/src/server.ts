import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from "./routes/postRoutes";
import cors from "cors"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(cors())
app.use("/api/posts",postRouter)

const startServer = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error("DB_URL environment variable is not set");
    }
    await mongoose.connect(dbUrl);
    console.log("Connected to mongoDB")

    app.listen(PORT, () => {
      console.log(`Listening at port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer()