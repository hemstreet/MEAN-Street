var _ = require('lodash'),
    config = require('./config'),
    Ratio = require('lb-ratio');

var Utilities = function (importConfig) {

    this.config = _.extend(config, importConfig);

};

Utilities.prototype.isFraction = function (value) {

    // @TODO Move this data into Cocktaildb.js. there should not be business logic inside here
    var re = /\d\s[^\d]/;
    var amount = value.substr(0, value.indexOf(re.exec(value)) + 1).trim();
    var total = amount.split(" ");

    total = _.reduce(total, function(key, value) {
            return value.indexOf("/") ? value.split("/")[0] / value.split("/")[1] : value;
    });

    var rest = value.substr(amount.length).trim().split(" ");
    var meas = rest[0];
    var additional = rest.join('').substr(meas.length);
    console.log("you need  " + total + " " + meas + " of " + additional, "----------");


    //var pieces = value.split('/'),
    //    total = value.split(' ')[0];
    //
    //if(pieces.length > 1) {
    //  var chunks = pieces[0].split(' ');
    //  // it is a fraction!
    //  if(chunks.length > 1) {
    //    var ratio = Ratio.parse(chunks);
    //    var fraction = parseInt( chunks[1] ) / parseInt( pieces[1].split(' ')[0]);
    //
    //    total = parseFloat(chunks[0]) + ratio;
    //
    //  }
    //}

    return total;

};

// Get standard measurements
Utilities.prototype.getMeasurements = function (instructions) {

    instructions = instructions.toLowerCase().trim();

    _.each(this.config.measurements, function (key, value) {
        value = value.toLowerCase();
        if (instructions.indexOf(value) > -1) {
            if (this.isFraction(instructions)) {
                // we have a fraction
                // return value w/ measurement
                // {cup: strippedMeasurement }
            }
            else {
                // return value w/ measurement
                // {cup: strippedMeasurement }
            }
        }
    }.bind(this));

    if (this._getSpecialMeasurements(instructions)) {
        // If we have not found a measurement value yet lets check for special measurements
    }

    //if(!response) {
    //  this.measurementUnknown(instructions);
    //}

    //return (response) ? response : false;

};

// This is for the edge case measurements
Utilities.prototype._getSpecialMeasurements = function (value) {
    var measurements = this.config.specialMeasurements;
};

Utilities.prototype._getSpecialIngredients = function (value) {
    var ingredients = this.config.specialIngredients;

    // check to see if we have a ingredient that we can not pour
};

Utilities.prototype.measurementUnknown = function (value) {

    // Write to log file for later review

};


module.exports = Utilities;