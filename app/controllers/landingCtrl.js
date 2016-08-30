angular.module('listApp')

    .controller('landingCtrl', ['$scope', '$http', '$location', '$state', 'userService', function($scope, $http, $location, $state, userService) {

        /*$scope.doesUserExist = userService.user;*/
        if (userService.user != null) {
            $scope.doesUserExist = 'user exists';
        } else {
            $scope.doesUserExist = 'user does not exist';
        }

        // LOGIN
        $scope.login = function() {            
            if(this.loginUsername && this.loginPassword) {
                $http({
                    method: 'POST', 
                    url:'/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        username: this.loginUsername,
                        password: this.loginPassword 
                    } 
                })
                .then(
                    function(res) {
                        $http.get('/profile')
                            .then(
                                function(res) {
                                    userService.user = res.data.user;
                                    $state.go("profile.dashboard");
                                },
                                function(res) {
                                    console.log("Failed Callback 2");
                                }
                            );
                    },
                    function() {
                        console.log("Failed Callback 1");
                    }
                );
            }
        };

        // SIGNUP
        $scope.signup = function() {            
            if(this.loginUsername && this.loginPassword) {
                $http({
                    method: 'POST', 
                    url:'/signup',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        username: this.loginUsername,
                        password: this.loginPassword 
                    } 
                })
                .then(
                    function(res) {
                        $http.get('/profile')
                            .then(
                                function(res) {
                                    /*userService.user = res.data.user;*/
                                    userService.addUser(res.data.user);
                                    $state.go("profile.dashboard");
                                },
                                function(res) {
                                    console.log("Failed Callback 2");
                                }
                            );
                    },
                    function() {
                        console.log("Failed Callback 1");
                    }
                );
            }
        };

        // GOOGLE AUTH
        $scope.googleAuth = function() {
            $http.get('/auth/google');
        };
        
    }]); 