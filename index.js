const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Add socket.io events
const messages = ['2afz', '"Hello"', '"World"', '"!"'];
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('last-messages', function (fn) {
    console.log('Get message')
    fn(messages.slice(-50))
  })
  socket.on('send-message', function (message) {
    console.log('new message')
    console.log(message)
    messages.push(message)
    socket.broadcast.emit('new-message', message)
  })
})

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

server.listen(3003, () => {
  console.log('listening on *:3000');
});