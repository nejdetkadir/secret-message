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

  async function initSocket(username) {
    try {
      const url = 'https://anonymous-message.herokuapp.com'; // development
      const socket = await indexFactory.connectSocket(url, {
        reconnectionAttempts: 3,
        reconnectionDelay: 600
      });
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

      $scope.sendMessage = () => {
        const messageData = {
          type: 1,
          text: $scope.message,
          username
        };
        $scope.messages.push(messageData);
        $scope.message = '';
        socket.emit('newMessage', {data: messageData});
      };

      socket.on('newMessage', (data) => {
        $scope.messages.push(data.data);
        $scope.$apply();
      });

      socket.on('initUsers', (data) => {
        $scope.users = data;
        $scope.$apply();
      });
    } catch (e) {
      console.log(e);
    }
  }
}]);
