var app = angular.module('restServer', ['ngRoute', 'ipCookie']);

app.constant('config', {
    "baseUrl": "/v1/rest",
    "token": {
        "name": "x-access-token",
        "expiration": 720
    }
});

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        redirectTo: '/login'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        requireAuth: false
    }).when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm',
        requireAuth: false
    }).when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        requireAuth: true
    }).when('/model/:name/edit/:_id', {
        templateUrl: 'views/edit.html',
        controller: 'EditController',
        controllerAs: 'vm',
        requireAuth: true
    }).when('/model/:model', {
        templateUrl: 'views/list.html',
        controller: 'ListController',
        controllerAs: 'vm',
        requireAuth: true
    });
}]);

app.run(function ($rootScope, $location, ipCookie) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        // Are we trying to access a page we don't have permission to?
        if (next.requireAuth && !ipCookie('x-access-token')) {
            $location.path('/login');
        }

        // We are already logged in, skip the login / signup page
        if (!next.requireAuth && ipCookie('x-access-token')) {
            $location.path('/dashboard');
        }
    })
});