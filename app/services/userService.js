angular.module('listApp')
    .service('userService', function() {
        this.user;

        this.addUser = function(newUser) {
            this.user = newUser;
        }; 

        this.removeUser = function() {
            this.user = null;
        };
    });