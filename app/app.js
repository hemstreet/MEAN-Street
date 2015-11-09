var app = angular.module('restServer', ['ngRoute', 'ipCookie']);

app.constant('config', {
    "baseUrl" : "/v1/rest",
    "token" : {
        "name" : "x-access-token",
        "tokenExpiration" : 31449600
    }
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    }).when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
    }).when('/models/:name/edit/:_id', {
        templateUrl: 'views/edit.html',
        controller: 'EditController',
        controllerAs: 'vm'
    }).when('/models/:model', {
        templateUrl: 'views/list.html',
        controller: 'ListController',
        controllerAs: 'vm'
    });
}]);