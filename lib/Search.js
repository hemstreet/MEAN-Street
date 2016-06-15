var _ = require('underscore'),
    q = require('q'),
    solr = require('solr-client'),
    SolrQueryBuilder = require('solr-query-builder');

var Search = function () {
    this.searchClients = null;
};

Search.prototype.add = function (modelName, model) {
    this.searchClients[modelName].add(model.toObject(), function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(obj);
        }
        this.commit(modelName);
    }.bind(this));
}

Search.prototype.removeById = function (modelName, id) {

    var query = "_id:" + id;

    this.searchClients[modelName].deleteByQuery(query, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(obj);
        }
        this.commit(modelName);
    }.bind(this));
}

Search.prototype.update = function (modelName, data) {
    this.searchClients[modelName].deleteByQuery(query, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(obj);
        }
        this.commit(modelName);
    }.bind(this));
};

Search.prototype.commit = function (modelName) {
    var options = {
        waitSearcher: false
    };

    this.searchClients[modelName].commit(options, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(obj);
        }
    });
};

Search.prototype.doSearch = function(modelName, _query) {

    var deferred = q.defer();

    this.doLookup(modelName, _query, 'search').then(function(results) {
        deferred.resolve(results);
    }).fail(function(err) {
        console.log(err);
        deferred.reject({
            "error": true,
            "message": "An error has occurred during search"
        });
    });

    return deferred.promise;
};

Search.prototype.doSpell = function(modelName, _query) {
    var deferred = q.defer();

    this.doLookup(modelName, _query, 'spell').then(function(results) {
        deferred.resolve(results);
    }).fail(function(err) {
        console.log(err);
        deferred.reject({
            "error": true,
            "message": "An error has occurred during spell search"
        });
    });

    return deferred.promise;

};

Search.prototype.doLookup = function(modelName, _query, action) {

    var deferred = q.defer();

    var query = this.buildQuery(modelName, _query);

    this.searchClients[modelName][action](query,function(err,obj){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(obj);
        }

        this.commit(modelName);
    }.bind(this));

    return deferred.promise;
}
Search.prototype.buildQuery = function(modelName, _query) {
    var qb = new SolrQueryBuilder().any(_query);
    var query = this.searchClients[modelName].createQuery()
        .q(qb.build());

    return query;

};

Search.prototype.getSearchClients = function (models) {

    var deferred = q.defer(),
        searchClients = {};

    // check for cached results
    if (this.searchClients) {
        deferred.resolve(this.searchClients);
    }

    var numModels = this.getNumberOfModels(models);
    i = 0;

    _.each(models, function (model) {
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

        if (i == numModels) {
            this.searchClients = searchClients;
            deferred.resolve(searchClients);
        }
    }.bind(this));
    return deferred.promise;
};

Search.prototype.getNumberOfModels = function (models) {
    return Object.keys(models).length;
};

module.exports = new Search();