const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
});

const io = socketio(server);
const users = {};

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("setUsername", function (username) {
    users[socket.id] = username;
    io.emit("users", Object.values(users));
  });

  socket.on("text", function (text) {
    io.emit("text", { text: text, users: Object.values(users) });
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");

    delete users[socket.id];
    io.emit("users", Object.values(users));
  });
});

server.listen(3000, function () {
  console.log("Server running on port 3000");
});
