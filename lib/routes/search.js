var _ = require('lodash'),
    Model = require('../Model');

module.exports = function (options) {

    var config = options.config,
        router = options.router,
        models = options.models,
        searchProvider = options.searchProvider;

    //router.route('/search/:modelName/:query')
    //    .get(function (req, res) {
    //        var params = req.params;
    //        searchProvider.doSearch(modelName, params);
    //        res.json({
    //            success: true,
    //            entries: "Entries go here"
    //        });
    //    });
    router.route('/search/:modelName/:query')

        .get(function (req, res) {
            //var modelName = model.getModelName(req.params.model);
            //
            //models[modelName].find(function (err, entries) {
            //    if (err) {
            //        res.send(err);
            //    }

                res.json({
                    success: true,
                    entries: true
                });
            //});
        });
};
