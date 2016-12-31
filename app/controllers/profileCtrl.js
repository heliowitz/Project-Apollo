angular.module('listApp')

    .controller('profileCtrl', ['$scope', '$http', '$location', '$state', 'userFactory', '$uibModal', function($scope, $http, $location, $state, userFactory, $uibModal) {
        $scope.user = userFactory.user;
        $scope.userFactory = userFactory;

        if (userFactory.user != null) {
            $scope.doesUserExist = 'user exists';
        } else {
            $scope.doesUserExist = 'user does not exist';
        }

        // TEST FOR DNDLISTS
        // $scope.listOne = [
        //   "one",
        //   "two",
        //   "three"
        // ];
        //
        // $scope.listTwo = [
        //   "A",
        //   "B",
        //   "C"
        // ];

        $scope.models = {
                selected: null,
                lists: {"A": []}
            };

            $scope.models.lists.A = $scope.user.backlogList;

            // // Generate initial model
            // for (var i = 1; i <= 3; ++i) {
            //     $scope.models.lists.A.push({label: "Item A" + i});
            //     // $scope.models.lists.B.push({label: "Item B" + i});
            // }

        ////////////////////

        $scope.openModal = function(toEditTask) {
          console.log('CALLED: openModal, profileCtrl');
          console.log(toEditTask);
          $scope.toggleAddBacklogTaskDialog(false);

          var modalInstance = $uibModal.open({
            animation: true,
            controller: 'editTaskModalCtrl',
            templateUrl: 'modal.html',
            windowClass: 'large-Modal',
            resolve: {
              backlogListPromise: ['userFactory', function(userFactory) {
                return userFactory.setEditTask(toEditTask);
              }]
            }
          });
        };





        // TOGGLE ADD BACKLOG TASK
        $scope.showAddBacklogTaskDialog = false;
        $scope.toggleAddBacklogTaskDialog = function(bool) {
          console.log('CALLED: showAddBacklogTaskDialog, profileCtrl.js');
          // if ($scope.showAddBacklogTaskDialog) {
          //   $scope.userFactory.clearBacklogListModels();
          //   $scope.showAddBacklogTaskDialog = false;
          // }
          // else {
          //   $scope.showAddBacklogTaskDialog = true;
          // }

          $scope.userFactory.clearBacklogListModels();
          $scope.showAddBacklogTaskDialog = bool;
        };

        // LOGOUT
        $scope.logout = function() {
            console.log('Logout successful');
            userFactory.removeUser();

            $http.get('/logout')
                .then(
                    function() {
                        $state.go('landing.splash');
                    },
                    function() {
                        console.log('logout callback failed');
                    }
                );
        };


    }]);
