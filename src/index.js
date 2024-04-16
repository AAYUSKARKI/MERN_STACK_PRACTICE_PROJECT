import {app} from "./app.js";
import dotenv from "dotenv";
import connectDB from './dbconfig/index.js';

dotenv.config({ path: "./.env" });

const port = process.env.PORT||3000;




connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((err)=>{
  console.log("mongodb connection failed",err);
})