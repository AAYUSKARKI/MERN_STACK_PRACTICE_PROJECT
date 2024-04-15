import {app} from "./app.js";
import dotenv from "dotenv";
import connectDB from './dbconfig/index.js';
import cors from 'cors';
dotenv.config({ path: "./.env" });

const port = process.env.PORT||3000;

// console.log(process.env.FRONTEND_URL,process.env.CORS_ORIGIN)

app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN,
  credentials: true
}))

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((err)=>{
  console.log("mongodb connection failed",err);
})