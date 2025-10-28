import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/auth.js";
import redis from "./db/redis.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

httpServer.listen(3000, () => console.log("Servidor en http://localhost:3000"));