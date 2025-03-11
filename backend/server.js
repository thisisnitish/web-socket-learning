const express = require('express');
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // TODO: Not recommended for production
  }
});

io.on("connection", (socket) => {
  // console.log("socket: ", socket)
  // console.log("Socket is active");

  socket.on("chat", (payload) => {
    console.log("Payload: ", payload)
    io.emit("chat", payload)
  })
})

server.listen(8000, () => {
  console.log("Server is running on port 8000")
})
