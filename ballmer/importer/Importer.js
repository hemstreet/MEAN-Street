var defaultConfig = require('../../config/config'),
    request = require('request'),
    q = require('q'),
    baseUrl = "http://localhost:3000/api/v1/",
    headers = {
        'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InNoYTEkMDY4YmJmYjckMSRiODJjYjBhMTBlYjQ2NTQ4YTBlYjM0ZThjYTc3ZGMwZDJkNzIzODk3IiwiYWRtaW4iOnRydWUsInVzZXJuYW1lIjoiYWRtaW4iLCJfaWQiOiI1NmY3MWNhNWRkYjI3ZGM0ODgwMDAwMDEiLCJfX3YiOjB9.78u-x9WFol9jik_g-HrVF8ocUhYGlGByzYEC_V5N5Lw'
    };

var Importer = function(config) {

    this.config = config || defaultConfig;
};

Importer.prototype.save = function(modelName, data) {
    var deferred = q.defer();

    request.post({
            url: baseUrl + '/create/' + modelName,
            headers: headers,
            form: data
        },
        function (error, response, body) {
            if(error) {
                deferred.reject(error);
                return;
            }
            if (response.statusCode == 200) {
                deferred.resolve(body);
            }
        }
    );

    return deferred.promise;
};


module.exports = Importer;
