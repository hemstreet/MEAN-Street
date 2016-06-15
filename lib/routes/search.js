var _ = require('lodash'),
    Model = require('../Model');

module.exports = function (options) {

    var config = options.config,
        router = options.router,
        models = options.models;

    router.route('/search/:modelName/:field/:query')
        .get(function (req, res) {
            var params = req.params;
            res.json({
                success: true,
                entries: "Entries go here"
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