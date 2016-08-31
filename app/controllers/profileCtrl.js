angular.module('listApp')

    .controller('profileCtrl', ['$scope', '$http', '$location', '$state', 'userFactory', function($scope, $http, $location, $state, userFactory) {
        $scope.user = userFactory.user;

        $scope.userFactory = userFactory;

        if (userFactory.user != null) {
            $scope.doesUserExist = 'user exists';
        } else {
            $scope.doesUserExist = 'user does not exist';
        }

        // LOGOUT
        $scope.logout = function() {
            console.log('Logout successful');
            userService.removeUser();

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

        // // ADD BACKLOG LIST TASK
        // $scope.addBacklogListTask = function() {
        //     console.log('add backlog list task function reached');
        //
        //     $http({
        //         method: 'POST',
        //         url:'/backlogList',
        //         data: {
        //             taskTitle: this.backlogListTaskTitle,
        //             taskTag: this.backlogListTaskTag,
        //             taskPoints: this.backlogListTaskPoints,
        //             taskStatus: "backlogList"
        //         }
        //     })
        //       .then(
        //         function() {
        //           console.log('Successful task callback');
        //         },
        //         function() {
        //           console.log('Failed task callback');
        //         }
        //       );
        //
        // };

    }]);
