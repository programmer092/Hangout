import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URL as string;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e: string) => console.log(e));
