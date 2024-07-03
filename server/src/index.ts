import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import http, { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import router from "./router/chat";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

interface UserMapSocketId {
  [userId: string]: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://hangout-lcgo.onrender.com",
      "https://hangout-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const port = process.env.PORT as string;
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hangout-lcgo.onrender.com",
      "https://hangout-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(router);

server.listen(port, () => {
  console.log(`Server is up at: http://localhost:${port}`);
});

export const getSocketId = (receiver: string): string | undefined => {
  return UserMapSocketId[receiver];
};

const UserMapSocketId: UserMapSocketId = {};

io.on("connection", (socket: Socket) => {
  console.log(socket.id, "connected");
  //reads the userID passed from the frontend and assign the socket id to it.
  const userId: string = socket.handshake.query.userId as string;
  if (userId != "undefined") UserMapSocketId[userId] = socket.id;

  //emit the event that only send the UsersId not socketid.
  io.emit("OnlineUsers", Object.keys(UserMapSocketId));

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });

  // Event to get the socket id of a user by their MongoDB user ID
  socket.on(
    "getSocketIdByUserId",
    (userId: string, callback: (socketId: string | null) => void) => {
      const socketId = UserMapSocketId[userId];
      callback(socketId || null);
    }
  );

  //on disconnect the userid is deleted from the UserMapSocketId and sends updated OnlineUsers event.
  socket.on("disconnect", () => {
    delete UserMapSocketId[userId];
    io.emit("OnlineUsers", Object.keys(UserMapSocketId));
  });
});

export { io };
