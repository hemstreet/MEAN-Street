var _ = require('lodash'),
    Model = require('../Model.js'),
    modellUtil = new Model();

module.exports = function(options){

    var router = options.router,
        models = options.models,
        auth   = options.auth,
        config = options.config;

    router.use(function (req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies[config.token.name];

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

    // :model/create
    // :model/edit/:_id
    // :model/update/:_id
    // :model/delete/:_id
    // :model/view/:_id
    // :model/list

    router.route('/:model/:_id')
        .get(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }

                res.json(entry);
            })
        })
        .put(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }

                entry.save(function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        success: true,
                        message: model + " Updated",
                        entry: entry
                    });
                })
            })
        })
        .delete(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model),
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
                        message: model + " Deleted"
                    });
                });
            });
        });

    router.route('/:model')

        .post(function (req, res) {

            var modelName = modellUtil.getModelName(req.params.model),
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
        })

        .get(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].find(function (err, entries) {
                if (err) {
                    res.send(err);
                }

                res.json(entries);
            });
        });
};