import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
console.log(process.env.FRONTEND_URL,process.env.CORS_ORIGIN)
app.use(cors({
    origin: "http://localhost:5173" || `${process.env.FRONTEND_URL}` || `${process.env.CORS_ORIGIN}` ,
    credentials: true
  }))

//routes import
import userRouter from './route/user.route.js'
import jobrouter from './route/job.route.js'

// //routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/jobs",jobrouter)
export { app }