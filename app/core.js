angular.module('listApp', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.when("", "/home/splash");
        $urlRouterProvider.otherwise('/home/splash');

        $stateProvider

            // Landing states
            .state('landing', {
                abstract: true,
                url: '/home',
                templateUrl: 'landing.html',
                controller: 'landingCtrl'
            })
                .state('landing.signup', {
                    url: '/signup',
                    templateUrl: 'landing.signup.html'
                })
                .state('landing.login', {
                    url: '/login',
                    templateUrl: 'landing.login.html'
                })
                .state('landing.splash', {
                    url: '/splash',
                    templateUrl: 'landing.splash.html'
                })

            // Profile states    
            .state('profile', {
                abstract: true,
                url: '/profile',
                templateUrl: 'profile.html',
                controller: 'profileCtrl'
            })
                .state('profile.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'profile.dashboard.html'
                });
            

    });