angular.module('restServer').service('modelService', ['config', function (config) {

    this.stripHidden = function(_fields) {
        var fields = [];

        angular.forEach(_fields, function(value) {
            if(value[0] !== '_') {
                fields.push(value);
            }
        });

        return fields;
    }
}]);
