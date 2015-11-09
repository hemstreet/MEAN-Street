angular.module('restServer').service('modelService', [function() {

    this.list = function(options) {
        console.log('list model test');
    };

    this.edit = function(options) {
        console.log('edit model test');
    };

}]);