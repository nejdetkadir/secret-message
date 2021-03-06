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
    socket.emit('initUsers', users);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disUser', users[socket.id]);
    delete users[socket.id];
  });

  socket.on('newMessage', (data) => {
    let messageData = data.data;
    messageData.type = 0;
    socket.broadcast.emit('newMessage', {data: messageData})
  });
});

module.exports = socketAPI;
