var _ = require('lodash');

var Utilities = function() {

};

Utilities.prototype.isFraction = function(value) {
  var pattern = /([0-9\ /]*)/,
    response = pattern.exec(value);

  return (response) ? response : false;

};

// Get standard measurements
Utilities.prototype.getMeasurements = function(value) {
  var measurements = [
    "oz",
    "tsp",
    "Tbsp"
  ];

  _.each(measurements, function(value, key) {
    if (value.indexOf(value)) {
      // we have a match on the measurements
    }
  });

  if (this._getSpecialMeasurements(value)) {
    // If we have not found a measurement value yet lets check for special measurements
  }

  return (response) ? response : false;

};

// This is for the edge case measurements
Utilities.prototype._getSpecialMeasurements = function(value) {
  var measurements = [
    "twist",
    "splash"
  ]
};

Utilities.prototype._getSpecialIngredients = function(value) {
  var ingredients = [
    "salt"
  ];

  // check to see if we have a ingredient that we can not pour
};

module.exports = Utilities;