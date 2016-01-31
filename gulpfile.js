'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');

var files = ['index.js', 'gulpfile.js', './lib/*.js', './test/*.spec.js',
 '!node_modules/**', '!*.json', './views/scss/**/*.scss'];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('sass', () => {
  return gulp.src('views/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('mocha', () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(files, ['sass', 'lint', 'mocha']);
});

gulp.task('default', ['watch', 'lint', 'mocha']);
