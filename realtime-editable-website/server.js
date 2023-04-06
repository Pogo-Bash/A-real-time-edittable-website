const http = require("http");
const fs = require("fs");
const socketio = require("socket.io");

let document = ""; // initialize document with an empty string

const server = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
});

const io = socketio(server);
io.on("connection", function(socket) {
  console.log("A user connected");

  // send the current document to the newly connected client
  socket.emit("document", document);

  socket.on("document", function(newDocument) {
    // update the document variable with the new document
    document = newDocument;

    // broadcast the updated document to all connected clients
    io.emit("document", document);
  });

  socket.on("disconnect", function() {
    console.log("A user disconnected");
  });
});

server.listen(3000, function() {
  console.log("Server running on port 3000");
});
