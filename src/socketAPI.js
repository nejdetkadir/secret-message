const socketio = require('socket.io');
const io = socketio();
const socketAPI = {};
const users = {};

socketAPI.io = io;
io.on('connection', (socket) => {
  socket.on('newUser', (data) => {
    const defaultData = {
      id: socket.id
    };
    const userData = Object.assign(data, defaultData);
    users[socket.id] = userData;
    socket.broadcast.emit('newUser', userData);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disUser', users[socket.id]);
    delete users[socket.id];
  });
});

module.exports = socketAPI;
