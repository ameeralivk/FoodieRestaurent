import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db";
import authRouter from "./Routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();
const app = express();
app.use(cors())


connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/admin/auth',authRouter)
app.use(errorHandler)
const port = process.env.PORT
app.listen(port, () => {
  console.log(`server created at ${port}`);
});
