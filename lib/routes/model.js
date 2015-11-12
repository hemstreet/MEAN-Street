var _ = require('lodash'),
    Model = require('../Model.js'),
    model = new Model();

module.exports = function (options) {

    var router = options.router,
        models = options.models;

    router.route('/list/:model')

        .get(function (req, res) {
            var modelName = model.getModelName(req.params.model);

            models[modelName].find(function (err, entries) {
                if (err) {
                    res.send(err);
                }

                res.json(entries);
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