import * as WebSocket from 'ws';


const io = require('socket.io')(4000);

const clients = {};

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    clients[socket.id] = message;

    io.emit('message', {
      cubes: Object.values(clients),
    });
  });

  socket.on('disconnect', () => {
    delete clients[socket.id];

    io.emit('message', {
      cubes: Object.values(clients),
    });
  });
});
