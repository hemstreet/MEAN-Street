var _ = require('underscore'),
    q = require('q'),
    solr = require('solr-client');

var Search = function() {
    this.searchClients = null;
};

Search.prototype.getSearchClients = function(models) {

    var deferred = q.defer(),
        searchClients = {};

    // check for cached results
    if(this.searchClients) {
        deferred.resolve(this.searchClients);
    }

    var numModels = Object.keys(models).length,
        i = 0;

    _.each(models, function(model) {
        var modelName = model["modelName"];
        i++;

        var searchClient = solr.createClient({
            //host : host,
            //port : port,
            core: modelName,
            //path : path,
            //agent : agent,
            //secure : secure,
            //bigint : bigint
        });

        searchClient.autoCommit = true;
        searchClients[modelName] = searchClient;

        if(i == numModels) {
            this.searchClients = searchClients;
            deferred.resolve(searchClients);
        }
    }.bind(this));
    return deferred.promise;
};

Search.prototype.add = function(modelName, model) {
    // Add documents
    this.searchClients[modelName].add(model.toObject(),function(err,obj){
        if(err){
            console.log(err);
        }else{
            console.log(obj);
        }
    });
}

Search.prototype.Query = function(query) {
    var query = 'q=id:UTF8TEST&mlt.fl=manu,cat&mlt.mindf=1&mlt.mintf=1';
    this.config.client.get('mlt', query, function(err, obj){
        if(err){
            console.log(err);
        }else{
            console.log(obj);
        }
    });
}

module.exports = new Search();