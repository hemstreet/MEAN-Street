"use strict";

var http = require('http'),
    config = require('../../config'),
    q = require('q'),
    Importer = require('../../Importer'),
    importer = new Importer(config),
    normalize = require('./normalize');

function CocktailDb() {
    this.categories = [];
    this.drinkIndex = 0;
    this.drinks = [];
    this.init();
}

CocktailDb.prototype.init = function () {

    this.getCategories().then(function(categories) {
        categories.forEach(function(value) {
            this.categories.push(value.strCategory.trim());
        }.bind(this));

        this.getDrinksFromCategory().then(function(drinks) {
            drinks.forEach(function(value) {
                this.getDrinkById(value.idDrink).then(function(drink) {

                    normalize.go(drink).then(function(cleanDrink) {
                        //importer.save(cleanDrink);
                    });
                    //this.drinks.push(drink);
                }.bind(this));
            }.bind(this));
        }.bind(this)).fail(function(err) {
            console.log(err);
        });

    }.bind(this)).fail(function(err) {
        console.log(err);
    });
    // get categories ( list.php?c=list )
    // get drink id's by category, save to array ( filter.php?c= )
    // get drink by id (lookup.php?i=' + drinkID )
};

CocktailDb.prototype.getCategories = function() {
    var deferred = q.defer();

    this.request('list.php?c=list').then(function(data) {
        deferred.resolve(data.drinks);
    }).fail(function(err) {
        deferred.reject(err);
    });

    return deferred.promise;
};

CocktailDb.prototype.getDrinksFromCategory = function() {
    var deferred = q.defer();

    var categoryReturn = 0;
    var drinks = [];
    this.categories.forEach(function(value) {
        this.request('filter.php?c=' + value.replace(/\s/gi, '_')).then(function(data) {
            drinks = drinks.concat(data.drinks);
            categoryReturn++;
            if(categoryReturn === this.categories.length) {
                deferred.resolve(drinks);
            }
        }.bind(this)).fail(function(err) {
            deferred.reject(err);
        });
    }.bind(this));

    return deferred.promise;
};

CocktailDb.prototype.getDrinkById = function (drinkId) {
    var deferred = q.defer();

    setTimeout(function() {
        this.request('lookup.php?i=' + drinkId)
            .then(function (data) {
                deferred.resolve(data.drinks[0]);
            }).fail(function (err) {
            deferred.reject(err);
        });

    }.bind(this), this.drinkIndex * 250);

    return deferred.promise;
};

CocktailDb.prototype.request = function (uri) {

    var deferred = q.defer();

    console.log('http://www.thecocktaildb.com/api/json/v1/1/' + uri);

    var chunks = '',
        request = http.get('http://www.thecocktaildb.com/api/json/v1/1/' + uri, function (response) {
            response.on('data', function (chunk) {
                chunks += chunk.toString();
            });
            response.on('end', function () {
                deferred.resolve(JSON.parse(chunks));
            });
        }).on('error', function(err) {
            deferred.reject(err);
        });

    return deferred.promise;
};


new CocktailDb();