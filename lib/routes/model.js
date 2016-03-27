var _ = require('lodash'),
    Model = require('../Model.js');

module.exports = function (options) {
    var model = new Model(options.config),
        router = options.router,
        models = options.models;

    router.route('/models')
        .get(function (req, res) {
            var modelNames = [];

            _.each(models, function(value, key) {
                modelNames.push(key);
            });

            res.json({
                success: true,
                models: modelNames
            });
        });

    router.route('/list/:model')

        .get(function (req, res) {
            var modelName = model.getModelName(req.params.model);

            models[modelName].find(function (err, entries) {
                if (err) {
                    res.send(err);
                }

                res.json({
                  success: true,
                  entries: entries
                });
            });
        });

    router.route('/schema/:model')

        .get(function (req, res) {
            var modelName = model.getModelName(req.params.model),
                schema = model.getSchema({
                    modelName: modelName
                });

            res.json({
                success: true,
                schema: schema
            });

        });

    router.route('/fields/:model')

        .get(function (req, res) {
            var modelName = model.getModelName(req.params.model),
                fields = model.getFields({
                    modelName: modelName
                });

            res.json({
                success: true,
                fields: fields
            });

        });
};
