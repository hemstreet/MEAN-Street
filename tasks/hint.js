module.exports = function (gulp, plugins, config) {
    gulp.task('hint', function () {
        return gulp.src([
                './lib/**.js',
                './lib/**/**.js'
            ])
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'));
    });
}