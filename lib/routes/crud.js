var _ = require('lodash'),
    Model = require('../Model.js'),
    modelUtil = new Model();

module.exports = function (options) {

    var router = options.router,
        models = options.models,
        auth = options.auth,
        config = options.config;

    router.use(function (req, res, next) {

        var token = req.headers['x-access-token'] || req.cookies[config.token.name];

        if (token) {
            auth.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Failure to authenticate token'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    router.route('/create/:model')
        .post(function (req, res) {

            var modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName];

            var model = new Model(),
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

                res.json({
                    success: true,
                    message: modelName + " Created",
                    model: model
                });
            })
        });

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
                model = new Model(),
                modelSchema = model.schema.paths;

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }
                _.forEach(Object.keys(modelSchema), function (n, index) {

                    if (n[0] !== '_') {
                        if (req.body) {
                            console.log(req.body[n]);
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