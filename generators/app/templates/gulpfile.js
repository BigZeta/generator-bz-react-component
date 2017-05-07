const gulp = require('gulp');
const inject = require('gulp-inject');
const connect = require('gulp-connect');
const debug = require('gulp-debug');
const fs = require('fs');
const data = require('gulp-data');
const minimist = require('minimist');
const plugins = require('gulp-load-plugins')();
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const clean = require('gulp-rimraf');
const webpack = require('webpack');
const plumber = require('gulp-plumber');


// Plugins
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');


gulp.task('sass-build', function () {
    return gulp
        .src(['src/static/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sass({
            sourceComments: false
        }))
        .pipe( minifyCss())
        .pipe(gulp.dest('assets/css'));
});


gulp.task('clean-assets', function () {
    console.log('Clean all files in assets folder');
    return gulp.src('assets/', { read: false }).pipe(clean());
});

gulp.task('clean',['clean-assets']);

gulp.task('default', ['sass-build','watch']);

gulp.task('watch', ['set-dev-node-env','build-dev'], function () {
    gulp.watch('src/static/scss/**/*.scss', ['sass-build']);
});

