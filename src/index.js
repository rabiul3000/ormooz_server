if (process.env.NODE_ENV !== "production") {
  await import("dotenv/config");
}
import express from "express";
import router from "./routers/router.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import mongodbConnection from "./config/mongodbConnection.js";
const app = express();





/* ================= Middleware ================= */
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

/* ================= Create HTTP Server ================= */
const server = http.createServer(app);

/* ================= Setup Socket.io ================= */
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room based on userId
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  // Join role-based room (new)
  socket.on("joinRole", (role) => {
    socket.join(role);
    console.log(`User joined role room: ${role}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
/* ================= Connect DB and start server ================= */
mongodbConnection().then(() => {
  server.listen(PORT, () => {
    console.log("Server running:", PORT);
  });
});

