import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv"
import { SocketHandler } from "./SocketHandler.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(cors());

// Make scoket srever 
const io = new Server(server, {
  cors: {
    origin:  process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

SocketHandler(io);

server.listen(process.env.PORT, () => {
  console.log(`Socket server running on port ${process.env.PORT}`);
});