var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(gulp),
    config = require('./config/config');

require('gulp-autoload-tasks')(gulp, plugins, config, 'tasks');

gulp.task('default', ['run', 'watch']);
