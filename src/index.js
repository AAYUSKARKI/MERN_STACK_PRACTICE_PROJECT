import express from 'express';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT||3000;


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});