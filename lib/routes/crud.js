"use strict";

const _ = require('lodash'),
    Model = require('../Model.js');

module.exports = function (options) {

    const fileService = require('../fileService');

    let config = options.config,
        modelUtil = new Model(config);

    let router = options.router,
        models = options.models,
        searchProvider = options.searchProvider;

    router.route('/create/:model')
        .post(function (req, res) {

            let modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName];

            let model = new Model(config),
                modelSchema = model.schema.paths;

            _.forEach(Object.keys(modelSchema), (n) => {

                if (n[0] !== '_') {
                    if (req.body[n]) {
                        model[n] = req.body[n];

                    }
                }
            });

            let files = req.files;

            fileService.uploadFilesAndGetUrls(files, model).then(model => {

                model.save(function (err) {
                    if (err) {
                        res.send(err);
                        return;
                    }

                    // searchProvider.add(modelName, model);

                    res.json({
                        success: true,
                        message: modelName + " Created",
                        model: model
                    });
                });
            });
        });

    router.route('/read/:model/:_id')
        .get(function (req, res) {
            var modelName = modelUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                    return;
                }

                res.json(entry);
            });
        });

    router.route('/update/:model/:_id')
        .post(function (req, res) {
            let modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName],
                model = new Model(config),
                modelSchema = model.schema.paths,
                id = req.params._id,
                entryForSolr = {};

            models[modelName].findById(id, function (err, entry) {
                if (err) {
                    res.send(err);
                }
                _.forEach(Object.keys(modelSchema), function (n) {

                    if (n[0] !== '_') {
                        if (req.body) {
                            entry[n] = req.body[n];

                            // Build an update query for Solr
                            entryForSolr[n] = {"set": req.body[n]};
                        }
                    }
                });

                let files = req.files;

                // We need to figure out if we are updating an image or not. check existing model and new file for changes
                // Need to update files if there
                if(files) {
                    fileService.uploadFilesAndGetUrls(files, entry).then(entry => {
                        entry.save(function (err) {
                            if (err) return res.send(err);

                            // Attach ID for lookup
                            entryForSolr._id = id;
                            searchProvider.update(modelName, entryForSolr);

                            res.json({
                                success: true,
                                message: modelName + " Updated",
                                entry: entry
                            });
                        });
                    });
                }
                else {
                    model.save(function (err) {
                        if (err) return res.send(err);

                        // Attach ID for lookup
                        entryForSolr._id = id;
                        searchProvider.update(modelName, entryForSolr);

                        res.json({
                            success: true,
                            message: modelName + " Updated",
                            entry: model
                        });
                    });
                }


            });
        });

    router.route('/delete/:model/:_id')
        .delete(function (req, res) {
            let modelName = modelUtil.getModelName(req.params.model),
                Model = models[modelName];

            Model.findById(req.params._id, function (/*err, entry*/) {

                Model.remove({
                    _id: req.params._id
                }, function (err) {
                    if (err) {
                        res.send(err);
                        return;
                    }

                    searchProvider.removeById(modelName, req.params._id);

                    res.json({
                        success: true,
                        message: modelName + " Deleted"
                    });
                });
            });
        });
};