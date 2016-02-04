'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const istanbul = require('gulp-istanbul');

var files = ['index.js', 'gulpfile.js', './lib/*.js', './test/*.spec.js',
 './public/js/*.js', './commands/*.js', '!node_modules/**'];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('sass', () => {
  return gulp.src('public/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('pre-test', () => {
  return gulp.src(['lib/*.js', 'commands/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('watch', () => {
  gulp.watch(files, ['lint', 'test']);
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass', 'lint', 'test']);
