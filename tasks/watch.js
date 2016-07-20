module.exports = function (gulp, plugins, config) {
    gulp.task('watch', ['hint'], function () {
        gulp.watch('lib/**/*.js' , ['hint']);
    });
}
