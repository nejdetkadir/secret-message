app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {
  const url = 'http://localhost:3000'; // development
  indexFactory.connectSocket(url, {
    reconnectionAttempts: 3,
    reconnectionDelay: 600
  }).then((socket) => {
    //console.log('connection successfully', socket);
  }).catch((err) => {
    console.log(err);
  });
}]);
