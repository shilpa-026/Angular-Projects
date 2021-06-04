const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let socket_map=new Map();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('user_name',(user_name_val)=>{
    if(!socket_map.has(user_name_val))
    {
      socket_map[socket.id]=user_name_val;
    }
    io.emit('user_joined', socket_map[socket.id]+" has joined");
  })
  socket.on('chat message', (msg) => {
    io.emit('chat_receive', socket_map[socket.id]+":"+msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});