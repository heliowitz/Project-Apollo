angular.module('listApp')
  .controller('editTaskModalCtrl', ['$scope', 'userFactory', function($scope, userFactory) {
    $scope.yas = "HEYYY";

    $scope.userFactory = userFactory;

    $scope.toEditTask = userFactory.toEditTask;
  }]);
