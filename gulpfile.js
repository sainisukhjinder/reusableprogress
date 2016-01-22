var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var connect = require('gulp-connect-multi')();
var livereload = require('gulp-livereload');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rimraf = require("gulp-rimraf");
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task('loadAllTask', function (cb) {

    runSequence('clean', 'lint', 'usemin', 'templateCopy', 'watch', 'connect');

});

gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe(rimraf({
            force: true
        }));
});

gulp.task('lint', function () {
    return gulp.src('js/components.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('usemin', function () {
    gulp.src('index.html')
        .pipe(usemin())
        .pipe(gulp.dest('dist/'));
});

gulp.task('templateCopy', function (done) {
    gulp.src([
    '*templates/*.html'
	]).pipe(minifyHtml())
        .pipe(gulp.dest('dist/'))
        .on('end', function () {
            done();
        });

});



gulp.task('watch', function () {
    watch(['css/*', 'js/*', '*.html', 'templates/*.html'], function () {
        runSequence('clean', 'lint', 'usemin', 'templateCopy', function () {
            gulp.src(['dist/index.html']).pipe(connect.reload());
        });
    });
});

gulp.task('connect', connect.server({
    root: ['./dist/'],
    port: 8000,
    livereload: true,
    open: {
        browser: 'chrome',
        file: 'index.html'
    }
}));

gulp.task('default',runSequence('clean', 'lint', 'usemin', 'templateCopy'));
gulp.task('develop', ['loadAllTask']);