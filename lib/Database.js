"use strict";
var Database = function(options) {
    this.config = options.config;
    this.db = options.db;
};

Database.prototype.connect = function(db) {
    this.db.connect(db);
};

module.exports = Database;