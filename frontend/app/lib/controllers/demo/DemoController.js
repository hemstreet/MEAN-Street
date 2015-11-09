angular.module('boilerPlate').controller('DemoController', ['$scope', 'demoService', function($scope, demoService) {

    var vm = this;

    vm.greeting = 'Hello World From the Controller!';

    demoService.test();
}]);