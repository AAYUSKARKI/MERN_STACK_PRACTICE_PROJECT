import {app} from "./app.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import connectDB from './dbconfig/index.js';

dotenv.config({ path: "./.env" });

const port = process.env.PORT||3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log(data);
    io.emit("message",data);
  })


  socket.on("typing", (data) => {
    console.log(data);
  })




  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});




connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((err)=>{
  console.log("mongodb connection failed",err);
})