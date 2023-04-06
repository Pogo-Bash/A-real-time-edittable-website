const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello, world!');
});
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      io.emit('message', message);
    });
  });