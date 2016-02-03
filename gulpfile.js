'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');

var files = ['index.js', 'gulpfile.js', './lib/*.js', './test/*.spec.js',
 './public/js/*.js', '!node_modules/**'];

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

gulp.task('sass_watch', () => {
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('mocha', () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(files, ['sass', 'lint', 'mocha']);
});

gulp.task('default', ['watch', 'lint', 'mocha']);
