var _ = require('lodash'),
    Model = require('../Model.js'),
    modelUtil = new Model(),
    Form = require('../Form.js'),
    form = new Form();

module.exports = function (options) {

    var router = options.router,
        models = options.models,
        auth = options.auth,
        config = options.config;

    router.route('/list/:model')

        .get(function (req, res) {
            var modelName = modelUtil.getModelName(req.params.model);

            models[modelName].find(function (err, entries) {
                if (err) {
                    res.send(err);
                }

                res.json(entries);
            });
        });

    router.route('/schema/:model')

        .get(function (req, res) {
            console.log('schema/model');
            var modelName = modelUtil.getModelName(req.params.model),
                schema = form.getModelSchema({
                modelName: modelName
            });

            res.json({
                success: true,
                schema: schema
            });

        });
};