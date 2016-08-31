angular.module('listApp')
  .factory('userFactory', ['$http', function($http) {
    var factory = {};

    factory.user;

    factory.addBacklogTask = function() {
      console.log('CALLED: userFactory, addBacklogTask()');
      return $http.post('/backlogList')
        .then(
          function(res) {
            console.log('SUCCESS: userFactory, addBacklogTask()');
          },
          function(res) {
            console.log('FAILED: userFactory, addBacklogTask()');
          }
        );

    };

    return factory;
  }]);
