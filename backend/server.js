const express = require("express");
const fastify = require("fastify")();
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const db = require("./models/Index");
const userRoutes = require("./routers/userRouter");

app.get("/", (req, res) => {
  res.send("SeN Transprot");
});

app.use("/users", userRoutes);

const httpServer = http.createServer(app); // Create an HTTP server for Express
const io = socketIo(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

db.sequelize.sync({ alter: false }).then(() => {
  httpServer.listen(3001, () => {
    console.log("HTTP Server Running on PORT 3001");
  });
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Handle chat events here
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });
});

fastify.listen(3002, () => {
  console.log("Fastify Server Running on PORT 3002");
});
