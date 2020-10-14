app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {
  $scope.messages = [];
  $scope.users = {};

  $scope.init = () => {
    const username = prompt('Please enter your username');
    if (username)
      initSocket(username);
    else
      return false;
  };

  function initSocket(username) {
    const url = 'http://localhost:3000'; // development
    indexFactory.connectSocket(url, {
      reconnectionAttempts: 3,
      reconnectionDelay: 600
    }).then((socket) => {
      socket.emit('newUser', {username});

      socket.on('newUser', (data) => {
        const messageData = {
          type: (data.id === socket.id) ? 1 : 0,
          text: 'Joined the room',
          username: data.username
        };
        $scope.messages.push(messageData);
        $scope.users[data.id] = data;
        $scope.$apply();
      });

      socket.on('disUser', (data) => {
        const messageData = {
          type: 0,
          text: 'Left the room',
          username: data.username
        };
        $scope.messages.push(messageData);
        delete $scope.users[data.id];
        $scope.$apply();
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}]);
