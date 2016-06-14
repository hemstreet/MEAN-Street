var _ = require('lodash'),
    Model = require('../Model'),
    Search = require('../Search'),
    q = require('q');

module.exports = function (options) {

    var config = options.config,
        search = new Search(),
        router = options.router,
        models = options.models;

    router.route('/search/:modelName/:field/:query')
        .get(function(req, res) {
            var params = req.params;

            search.find(params["modelName"],params["field"],params["query"]).then(function(results) {
                res.json({
                    success: true,
                    entries: results
                });
            }).fail(function(err) {
                res.json({
                    success: false,
                    error: "An error has occured"
                });
            });
        });

    router.route('/search/:query')
        .get(function (req, res) {
            res.json({
                success: true,
                entries: true
            });
        });
};