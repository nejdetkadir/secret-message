const socketio = require('socket.io');
const io = socketio();
const socketAPI = {

};

socketAPI.io = io;
io.on('connection', (socket) => {
  //console.log('a user connected.');
});

module.exports = socketAPI;
