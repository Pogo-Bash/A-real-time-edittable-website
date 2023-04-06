const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

const server = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
});

const io = socketio(server);
let userCount = 0;

io.on("connection", function(socket) {
  console.log("A user connected");

  userCount++;
  io.emit("userCount", userCount);

  socket.on("text", function(text) {
    io.emit("text", text);
  });

  socket.on("disconnect", function() {
    console.log("A user disconnected");

    userCount--;
    io.emit("userCount", userCount);
  });
});

server.listen(3000, function() {
  console.log("Server running on port 3000");
});
