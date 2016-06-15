var _ = require('lodash'),
    Model = require('../Model.js');

module.exports = function (options) {

    var config = options.config,
        modelUtil = new Model(config);

    var router = options.router,
        models = options.models,
        searchProvider = options.searchProvider;

    router.route('/create/:model')
        .post(function (req, res) {

            var modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName];

            var model = new Model(config),
                modelSchema = model.schema.paths;

            _.forEach(Object.keys(modelSchema), function (n) {

                if (n[0] !== '_') {
                    if (req.body[n]) {
                        model[n] = req.body[n];
                    }
                }
            });

            model.save(function (err) {
                if (err) {
                    res.send(err);
                }

                searchProvider.add(modelName, model);

                res.json({
                    success: true,
                    message: modelName + " Created",
                    model: model
                });
            })
        }.bind(this));

    router.route('/read/:model/:_id')
        .get(function (req, res) {
            var modelName = modelUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }

                res.json(entry);
            })
        });

    router.route('/update/:model/:_id')
        .put(function (req, res) {
            var modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName],
                model = new Model(config),
                modelSchema = model.schema.paths;

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }
                _.forEach(Object.keys(modelSchema), function (n, index) {

                    if (n[0] !== '_') {
                        if (req.body) {
                            entry[n] = req.body[n];
                        }
                    }
                });

                entry.save(function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        success: true,
                        message: modelName + " Updated",
                        entry: entry
                    });
                })
            })
        });


    router.route('/delete/:model/:_id')
        .delete(function (req, res) {
            var modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName];

            Model.findById(req.params._id, function (err, entry) {
                //delete
                Model.remove({
                    _id: req.params._id
                }, function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        success: true,
                        message: modelName + " Deleted"
                    });
                });
            });
        });
};