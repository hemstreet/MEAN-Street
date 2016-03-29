var Importer = require('../Importer'),
    importer = new Importer(),
    jsonHttp = require('json-http'),
    _ = require('lodash');

jsonHttp.getJson('http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list', function(error, response) {
    var ingredients = response.drinks;

    _.each(ingredients, function(value, key) {

        var timeout = 600000;
        setTimeout(function() {
            jsonHttp.getJson('http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + value.strIngredient1, function(error, response) {

                if(error) {
                    console.log(error);
                    return;
                }

                var drinks = response.drinks,
                    timeout = 2000;

                _.each(drinks, function(value, key) {

                    setTimeout(function() {
                        var url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + value.idDrink;
                        jsonHttp.getJson(url, function(error, response) {
                            if(error) {
                                console.log(error);
                                return;
                            }
                            var drink = response.drinks[0],
                                data = {
                                    name: drink.strDrink,
                                    proportions : {}
                                },
                                hasBadMeasurement = false;

                            _.times(14, function(i) {

                                var measurement = drink["strMeasure" + ( i + 1)].trim();

                                if(hasBadMeasurement) {
                                    return;
                                }else if (measurement == "") {
                                    return;
                                }

                                data.proportions[drink["strIngredient" + (i + 1)].trim()] = drink["strMeasure" + ( i + 1)].trim();

                            });

                            if(hasBadMeasurement) {
                                return;
                            }

                            importer.save('Drink', data).then(function(data) {
                                console.log(data);
                            }).fail(function(error) {
                                console.log(error);
                            });

                        });
                    }, key * timeout );

                });

            });
        },timeout * key);

    });

});
